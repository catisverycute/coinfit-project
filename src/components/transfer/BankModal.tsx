import React from 'react';
import closeLg from '../../assets/icons/closeIcon.svg';
import Button from '../common/Button';

interface ModalProps {
  onClose: () => void;
  onSelect: (bank: string) => void;
}

const banks = ['우리', '신한', '농협', '신협', '카카오'];

const BankModal: React.FC<ModalProps> = ({ onClose, onSelect }) => {
  return (
    <div className="border rounded-t-lg bg-white w-full fixed bottom-0 left-0 z-50">
      <div className="pt-10 pb-10 pr-4 pl-4">
        <div className="flex justify-between *:mb-6 text-3xl">
          은행
          <Button className="bg-white border-none" onClick={onClose}>
            <img className="w-8" src={closeLg} />
          </Button>
        </div>
        <div className="grid grid-cols-3 ml-2 my-8 text-lg gap-3">
          {banks.map((bank) => (
            <button
              key={bank}
              className="p-6 w-28 border rounded-2xl"
              onClick={() => onSelect(bank)}
            >
              {bank}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankModal;
