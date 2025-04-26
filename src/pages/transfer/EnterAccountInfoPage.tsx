import { useState } from 'react';
import BankModal from '../../components/transfer/BankModal';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import { useFindAccount } from '../../hooks/account/useFindAccount';

const EnterAccountInfoPage = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  const [accountNumber, setAccountNumber] = useState(prevState.toAccount || '');
  const [bank, setBank] = useState(prevState.bank || '');

  const { owner, loading, error: findError, findAccount } = useFindAccount();

  const nextStep = async () => {
    if (!accountNumber || !bank) {
      setError('계좌번호와 은행을 모두 입력하세요.');
      return;
    }
    setError('');
    await findAccount(bank, accountNumber);
  };

  if (owner) {
    navigate('/transfer/step3', {
      state: {
        ...prevState,
        accountNumber,
        bank,
        ownerName: owner.ownerName,
        ownerId: owner.ownerId,
      },
    });
  }

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
          {bank ? bank : '은행 선택'}
        </button>
      </div>
      {error && <div className="text-red-500 my-2">{error}</div>}
      {findError && <div className="text-red-500 my-2">{findError}</div>}
      {loading && <div className="text-blue-500 my-2">계좌 확인 중...</div>}
      <button
        onClick={nextStep}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        확인
      </button>
      {show && (
        <BankModal
          onClose={() => setShow(false)}
          onSelect={(selectedBank) => {
            setBank(selectedBank);
            setShow(false);
          }}
        />
      )}
    </div>
  );
};

export default EnterAccountInfoPage;
