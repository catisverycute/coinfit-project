import React from 'react';
import closeLg from '../../assets/icons/closeIcon.svg';
import Button from '../common/Button';
import InsufficientModal from './InsufficientModa';

interface ModalProps {
  onClose: () => void;
}

const ChargeModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="border rounded-t-xl h-3/4 bg-white w-full fixed bottom-0 z-50">
      <div className="pt-10 pb-10 pr-4 pl-4">
        <div className="flex justify-between *:mb-6 text-3xl">
          얼마나 충전할까요?
          <Button className="bg-white border-none" onClick={onClose}>
            <img className="w-8" src={closeLg} />
          </Button>
        </div>
        <div className="border rounded-xl m-2 p-5 text-xl">가나 1234에서</div>
        <div className="flex flex-col items-start ml-2 my-8 text-lg">
          <button className="p-2">100만원</button>
          <button className="p-2">50만원</button>
          <button className="p-2">30만원</button>
          <button className="p-2">20만원</button>
          <button className="p-2">10만원</button>
          <button className="p-2">직접 입력</button>
        </div>
      </div>
      {/* <InsufficientModal /> */}
    </div>
  );
};

export default ChargeModal;
