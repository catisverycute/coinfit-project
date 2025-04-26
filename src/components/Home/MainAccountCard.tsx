import { useEffect } from 'react';
import { useFindMainAccount } from '../../hooks/account/useFindAccount';
import { auth } from '../../firebase';

export default function MainAccountCard() {
  const { mainAccount, loading, error, findMainAccount } = useFindMainAccount();

  useEffect(() => {
    if (auth.currentUser) {
      findMainAccount(auth.currentUser.uid);
    }
  }, []);

  if (loading) return <div>대표 계좌 불러오는 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="bg-white rounded-xl border p-4 mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-bold text-base">대표 계좌</span>
        <span className="text-blue-500 text-sm cursor-pointer">
          더보기 &gt;
        </span>
      </div>
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-3"></div>
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
        <div className="flex justify-end gap-3">
          <button className="bg-blue-500 text-white rounded px-4 py-1">
            송금
          </button>
        </div>
      </div>
    </div>
  );
}
