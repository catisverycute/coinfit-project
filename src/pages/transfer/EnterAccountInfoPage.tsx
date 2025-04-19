import { useState } from 'react';
import BankModal from '../../components/transfer/BankModal';

const EnterAccountInfoPage = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">계좌번호 입력</h2>
      <div className="border rounded">
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="계좌번호를 입력하세요"
          className="border-b px-3 py-2 w-full"
        />
        <button className="px-3 py-2" onClick={() => setShow(true)}>
          은행 선택
        </button>
        <select>
          <option></option>
        </select>
      </div>
      {show && <BankModal onClose={() => setShow(false)} />}
    </div>
  );
};

export default EnterAccountInfoPage;
