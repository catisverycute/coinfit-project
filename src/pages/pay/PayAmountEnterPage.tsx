import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AmountKeyPad from '../../components/transfer/AmountKeypad';
import BackButton from '../../components/common/BackButton';
import { useMoneyFitPay } from '../../hooks/usePay';

const PayAmountEnterPage = () => {
  const [amount, setAmount] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const ownerName = location.state?.ownerName || '';
  const { pay } = useMoneyFitPay();

  const handleClick = (value: string) => {
    if (amount === '' && (value === '0' || value === '00')) return;
    if (amount === '0' && (value === '0' || value === '00')) return;
    setAmount((prev) => (prev === '0' ? value : prev + value));
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!pay) {
      alert('페이 정보 없음');
      return;
    }
    if (Number(amount) > pay.balance) {
      alert('페이 잔액이 부족합니다.');
      return;
    }
    navigate('/pay/transfer/confirm', {
      state: {
        ...location.state,
        amount,
        fromAccount: 'moneyfitpay',
        fromAccountBank: 'MoneyFit Pay',
        fromAccountNumber: '',
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
        <div className="text-gray-500 mt-2">
          페이 잔액: {pay?.balance?.toLocaleString() ?? 0}원
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

export default PayAmountEnterPage;
