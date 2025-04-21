import { useState } from 'react';
import BankModal from '../../components/transfer/BankModal';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';

const EnterAccountInfoPage = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const nextStep = () => {
    navigate('/transfer/step3');
  };

  return (
    <div className="p-6 mt-5">
      <BackButton />
      <h2 className="text-2xl font-bold mb-8">계좌번호 입력</h2>
      <div className="border rounded">
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="계좌번호를 입력하세요"
          className="border-b px-3 py-5 w-full"
        />
        <button className="px-3 py-5" onClick={() => setShow(true)}>
          은행 선택
        </button>
      </div>
      <button onClick={nextStep}>확인</button>
      {show && <BankModal onClose={() => setShow(false)} />}
    </div>
  );
};

export default EnterAccountInfoPage;
