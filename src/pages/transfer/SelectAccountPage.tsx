import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Button from '../../components/common/Button';

const SelectAccountPage: React.FC = () => {
  const navigate = useNavigate();

  const nextStep = () => {
    navigate('/transfer/step2');
  };

  return (
    <div className="m-3">
      <div className="text-3xl my-8">어떤 계좌로 보낼까요?</div>
      <button className="text-2xl mb-5" onClick={nextStep}>
        계좌번호 입력
      </button>
      {/* <Button className="bg-white border-none">계좌번호 입력</Button> */}
      <div className="text-2xl">
        최근에 보낸 계좌
        <div className="border mt-5 p-3 rounded-lg">계좌1</div>
        <div className="border mt-5 p-3 rounded-lg">계좌2</div>
        <div className="border mt-5 p-3 rounded-lg">계좌3</div>
      </div>
    </div>
  );
};

export default SelectAccountPage;
