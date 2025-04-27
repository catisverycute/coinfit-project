import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AmountKeyPad from '../../components/transfer/AmountKeypad';
import BackButton from '../../components/common/BackButton';
import { useAccount } from '../../hooks/account/useAccount';
import { usePay } from '../../hooks/usePay';
import ChargeConfirmModal from '../../components/pay/ChargeConfimModal';

const ChargePage = () => {
  const location = useLocation();
  const selectedAmount = location.state?.selectedAmount;
  const [amount, setAmount] = useState<string>(
    selectedAmount ? String(selectedAmount) : ''
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { accounts } = useAccount();
  const selectedAccountId = location.state?.selectedAccountId;
  const myMainAccount =
    accounts.find((acc) => acc.id === selectedAccountId) ||
    accounts.find((acc) => acc.isMain) ||
    accounts[0];

  const fromAccountId = myMainAccount?.id || '';
  const fromAccountBank = myMainAccount?.bank || '';
  const fromAccountNumber = myMainAccount?.accountNumber || '';
  const { chargePay } = usePay();

  const handleClick = (value: string) => {
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
    setShowModal(true);
  };

  const handleChargeConfirm = async () => {
    await chargePay(Number(amount));
    setShowModal(false);
    navigate('/account/charge-success', { state: { amount } });
  };

  return (
    <div>
      <BackButton />
      <div className="flex flex-col text-center">
        <div className="text-3xl py-2">얼마를 충전할까요?</div>
        <div className="text-4xl">
          {amount.length === 0 ? '0' : Number(amount).toLocaleString()}원
        </div>
      </div>
      <AmountKeyPad
        onInput={handleClick}
        onDelete={handleDelete}
        onConfirm={handleSubmit}
      />
      <ChargeConfirmModal
        open={showModal}
        amount={amount}
        fromAccountBank={fromAccountBank}
        fromAccountNumber={fromAccountNumber}
        onCancel={() => setShowModal(false)}
        onConfirm={handleChargeConfirm}
      />
    </div>
  );
};

export default ChargePage;
