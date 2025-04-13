import React from 'react';

interface InputProps {
  id: string;
  inputName: string;
  placeholder?: string;
}

const InputForm: React.FC<InputProps> = ({ id, inputName, placeholder }) => {
  return (
    <>
      <label className="m-3" htmlFor={id}>
        {inputName}
      </label>
      <input className="m-3" id={id} type="text" placeholder={placeholder} />
    </>
  );
};

export default InputForm;
