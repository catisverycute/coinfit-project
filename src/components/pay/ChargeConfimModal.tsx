import React from 'react';
import Button from '../../components/common/Button';

interface ChargeConfirmModalProps {
  open: boolean;
  amount: string;
  fromAccountBank: string;
  fromAccountNumber: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ChargeConfirmModal: React.FC<ChargeConfirmModalProps> = ({
  open,
  amount,
  fromAccountBank,
  fromAccountNumber,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="text-xl font-bold mb-4">충전 확인</div>
        <div className="mb-2">
          {fromAccountBank} {fromAccountNumber} 에서
        </div>
        <div className="mb-4 text-3xl font-semibold">
          {Number(amount).toLocaleString()}원을 충전합니다
        </div>
        <div className="flex gap-4 mt-3">
          <Button onClick={onCancel}>취소</Button>
          <Button color="primary" onClick={onConfirm}>
            충전하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChargeConfirmModal;
