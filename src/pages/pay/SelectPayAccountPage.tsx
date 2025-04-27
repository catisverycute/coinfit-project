import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import { useTransferAccount } from '../../hooks/useTransferAccount';

const SelectPayAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  const { transferAccounts, loading } = useTransferAccount();

  const handleSelect = (toAccount: string, toName: string, bank: string) => {
    navigate('/account/transfer/step2', {
      state: { ...prevState, toAccount, toName, bank },
    });
  };

  const handleInputAccount = () => {
    navigate('/account/transfer/step2', {
      state: { ...prevState, directInput: true },
    });
  };

  return (
    <div className="m-3">
      <BackButton />
      <div className="text-3xl my-8">어떤 계좌로 보낼까요?</div>
      <button className="text-2xl mb-5" onClick={handleInputAccount}>
        계좌번호 입력
      </button>
      <div className="text-2xl">
        최근에 보낸 계좌
        {loading && <div className="text-gray-400 mt-4">불러오는 중...</div>}
        {!loading && transferAccounts.length === 0 && (
          <div className="text-gray-400 mt-4">최근 송금 계좌가 없습니다.</div>
        )}
        {transferAccounts.map((acc, i) => (
          <div
            key={i}
            className="border mt-5 p-3 rounded-lg cursor-pointer hover:bg-blue-50"
            onClick={() => handleSelect(acc.toAccount, acc.toName, acc.bank)}
          >
            {acc.bank} {acc.toAccount} {acc.toName && `(${acc.toName})`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPayAccountPage;
``;
