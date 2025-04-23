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
    navigate('/transfer/step4');
  };

  return (
    <div>
      <BackButton />
      EnterAmount
      <div className="flex flex-col text-center">
        <div className="text-xl py-2">님에게</div>
        <div className="text-3xl py-2"> 얼마를 보낼까요?</div>
        <div className="text-4xl">{amount.length === 0 ? '0' : amount}원</div>
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
