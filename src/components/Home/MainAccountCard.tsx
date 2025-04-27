import { useEffect } from 'react';
import { useFindMainAccount } from '../../hooks/account/useFindAccount';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

export default function MainAccountCard() {
  const { mainAccount, loading, error, findMainAccount } = useFindMainAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      findMainAccount(auth.currentUser.uid);
    }
  }, []);

  const handleSendMoney = () => {
    if (!mainAccount) return;
    navigate('/account/transfer/step1', {
      state: {
        fromAccountId: mainAccount.id,
        fromAccountBank: mainAccount.bank,
        fromAccountNumber: mainAccount.accountNumber,
        fromAccountAlias: mainAccount.alias,
        fromAccountBalance: mainAccount.balance,
      },
    });
  };

  if (loading) return <div>대표 계좌 불러오는 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="bg-white rounded-xl border mx-5 p-4 mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-bold text-base">대표 계좌</span>
        <Link to="/account">
          <span className="text-blue-500 text-sm cursor-pointer">
            더보기 &gt;
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mr-3"></div>
          <div>
            <div className="font-bold">
              {mainAccount ? mainAccount.alias : '대표 계좌 없음'}
            </div>
            <div className="text-gray-500 text-sm">
              {mainAccount
                ? `${mainAccount.bank} ${mainAccount.accountNumber}`
                : ''}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="primaryBtn"
            onClick={handleSendMoney}
            disabled={!mainAccount}
          >
            송금
          </Button>
        </div>
      </div>
    </div>
  );
}
