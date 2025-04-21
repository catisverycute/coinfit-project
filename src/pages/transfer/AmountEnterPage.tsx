import { useNavigate } from 'react-router-dom';
import AmountKeyPad from '../../components/transfer/AmountKeypad';
import { useState } from 'react';
import BackButton from '../../components/common/BackButton';

const AmountEnterPage = () => {
  const [amount, setAmount] = useState<string>('');
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    setAmount((prev) => (prev === '0' ? value : prev + value));
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    navigate('/transfer/step2');
  };

  return (
    <div>
      <BackButton />
      EnterAmount
      <span className="text-xl">님에게</span>
      <span className="text-2xl">얼마를 보낼까요?</span>
      <span className="text-xl">{amount.length === 0 ? '0' : amount}원</span>
      <AmountKeyPad
        onInput={handleClick}
        onDelete={handleDelete}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default AmountEnterPage;
