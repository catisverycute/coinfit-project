import React from 'react';
import Button from '../common/Button';

interface InsufficientModalProps {
  onClose: () => void;
  onChangeAmount: () => void;
}

const InsufficientModal: React.FC<InsufficientModalProps> = ({
  onClose,
  onChangeAmount,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20">
    <div className="border text-lg flex flex-col justify-center items-center p-8 rounded-lg bg-white shadow-lg min-w-[260px]">
      <div className="p-2 text-center">충전 계좌의 잔액이 부족합니다.</div>
      <div className="p-2 text-center">충전할 금액을 변경해주세요.</div>
      <div className="flex gap-3 mt-2 w-full">
        <Button className="flex-1" onClick={onClose}>
          닫기
        </Button>
        <Button className="flex-1" onClick={onChangeAmount}>
          금액 변경하기
        </Button>
      </div>
    </div>
  </div>
);

export default InsufficientModal;
