import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AmountKeyPad from '../../components/transfer/AmountKeypad';
import BackButton from '../../components/common/BackButton';
import { useAccount } from '../../hooks/account/useAccount';
import { useUserName } from '../../hooks/useUserName';

const AmountEnterPage = () => {
  const [amount, setAmount] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const ownerName = location.state?.ownerName || '';

  const { accounts } = useAccount();
  const myMainAccount = accounts.find((acc) => acc.isMain) || accounts[0];
  const fromAccountId = myMainAccount?.id || '';
  const fromAccountBank = myMainAccount?.bank || '';
  const fromAccountNumber = myMainAccount?.accountNumber || '';

  const fromAccountOwner = useUserName();

  const handleClick = (value: string) => {
    if (amount === '' && (value === '0' || value === '00')) {
      return;
    }
    if (amount === '0' && (value === '0' || value === '00')) {
      return;
    }
    setAmount((prev) => (prev === '0' ? value : prev + value));
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!fromAccountId) {
      alert('출금 계좌가 없습니다.');
      return;
    }
    navigate('/account/transfer/step4', {
      state: {
        ...location.state,
        amount,
        fromAccount: fromAccountId,
        fromAccountBank,
        fromAccountNumber,
        fromAccountOwner,
      },
    });
  };

  return (
    <div>
      <BackButton />
      <div className="flex flex-col text-center">
        <div className="text-xl py-2">
          {ownerName ? `${ownerName}님에게` : '님에게'}
        </div>
        <div className="text-3xl py-2">얼마를 보낼까요?</div>
        <div className="text-4xl">
          {amount.length === 0 ? '0' : Number(amount).toLocaleString()}원
        </div>
      </div>
      <AmountKeyPad
        onInput={handleClick}
        onDelete={handleDelete}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default AmountEnterPage;
