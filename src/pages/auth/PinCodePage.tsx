import React from 'react';
import PinInput from '../../components/auth/PinInput';

const PinCodePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      간편로그인
      <PinInput length={6} filledLength={length}/>
    </div>
  );
};

export default PinCodePage;
