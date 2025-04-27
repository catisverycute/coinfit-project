import React from 'react';
import Button from '../common/Button';

interface AmountKeyPadProps {
  onInput: (value: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

const AmountKeyPad: React.FC<AmountKeyPadProps> = ({
  onInput,
  onDelete,
  onConfirm,
}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '←'];

  const handleClick = (key: string) => {
    if (key === '←') {
      onDelete();
    } else {
      onInput(key);
    }
  };

  return (
    <div className="grid grid-cols-3 px-3 py-5">
      {keys.map((keyNum) => (
        <Button
          key={keyNum}
          variant="keypad"
          onClick={() => handleClick(keyNum)}
        >
          {keyNum}
        </Button>
      ))}

      <Button variant="primaryBtn" className="m-5" onClick={onConfirm}>
        확인
      </Button>
    </div>
  );
};

export default AmountKeyPad;
