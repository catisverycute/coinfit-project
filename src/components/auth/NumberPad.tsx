import React from 'react';
import Button from '../common/Button';

const NumberPad: React.FC = () => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '←'];
  return (
    <div className="grid grid-cols-3 px-3 py-5">
      {keys.map((keyNum) => (
        <Button key={keyNum} variant="keypad">
          {keyNum}
        </Button>
      ))}

      <Button variant="primaryBtn" className="m-5">
        확인
      </Button>
    </div>
  );
};

export default NumberPad;
