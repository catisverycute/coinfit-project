import React from 'react';
import closeLg from '../../assets/icons/close-lg.svg';
import Button from '../common/Button';

interface ModalProps {
  onClose: () => void;
}

const BankModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="border rounded-t-lg bg-white w-full fixed bottom-0 z-50">
      <div className="pt-10 pb-10 pr-4 pl-4">
        <div className="flex justify-between *:mb-6 text-3xl">
          은행
          <Button className="bg-white border-none" onClick={onClose}>
            <img className="w-8" src={closeLg} />
          </Button>
        </div>
        <div className="grid grid-cols-4 ml-2 my-8 text-lg">
          <button className="p-2 border rounded-2xl">100만원</button>
          <button className="p-2 border rounded-2xl">50만원</button>
          <button className="p-2 border rounded-2xl">30만원</button>
          <button className="p-2 border rounded-2xl">20만원</button>
          <button className="p-2 border rounded-2xl">10만원</button>
          <button className="p-2 border rounded-2xl">직접 입력</button>
        </div>
      </div>
    </div>
  );
};

export default BankModal;
