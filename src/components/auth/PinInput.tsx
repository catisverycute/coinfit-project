import React from 'react';

interface PinInputProps {
  length: number;
  filledLength: number;
}

const PinInput: React.FC<PinInputProps> = ({ length, filledLength }) => {
  return (
    <div className="flex justify-center gap-8 m-10">
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full border transition-all duration-200 ${
            i < filledLength ? 'bg-black' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );
};

export default PinInput;
