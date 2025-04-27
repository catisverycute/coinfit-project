import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import Button from '../../components/common/Button';
import { useTransferMoney } from '../../hooks/useTransferMoney';

const TransferConfirmPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transfer, error, loading } = useTransferMoney();

  const {
    ownerName,
    amount,
    accountNumber,
    bank,
    fromAccount,
    fromAccountBank,
    fromAccountNumber,
    fromAccountOwner,
  } = location.state || {};

  const [memo, setMemo] = useState('');

  const handleSend = async () => {
    const success = await transfer({
      fromAccount,
      toAccount: accountNumber,
      toName: ownerName,
      bank,
      amount,
      memo,
    });
    if (success) {
      navigate('/account/transfer/success', { state: { amount, ownerName } });
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mt-3 mb-1"></div>
        <div className="text-lg">
          {bank} {accountNumber}
        </div>
        <div className="m-5">
          <div className="text-2xl">{ownerName}님에게</div>
          <div className="text-2xl">
            {Number(amount).toLocaleString()}원을 보낼까요?
          </div>
        </div>
        <div className="text-base">
          <div>
            출금계좌: {fromAccountBank} {fromAccountNumber}
          </div>
          <div>
            받는 분에게 표시:{' '}
            <span className="font-semibold">{fromAccountOwner}</span>
          </div>
          <div className="flex items-center w-fit mb-2">
            <label
              htmlFor="memo"
              className="text-base mr-2 text-gray-700 min-w-max"
            >
              메모:
            </label>
            <input
              id="memo"
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="입력 (선택)"
              className="border rounded px-2 py-1 w-48"
              maxLength={30}
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 my-2 font-semibold">{error}</div>
        )}
        <div className="flex gap-3 m-5">
          <Button
            variant="primaryBtn"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            취소
          </Button>
          <Button variant="primaryBtn" onClick={handleSend} disabled={loading}>
            {loading ? '처리중...' : '보내기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmPage;
