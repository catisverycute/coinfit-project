import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  inputName: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const InputForm: React.FC<InputProps> = ({
  id,
  inputName,
  placeholder,
  onChange,
  errorMessage,
  ...other
}) => {
  return (
    <>
      <label className="m-3" htmlFor={id}>
        {inputName}
      </label>
      <input className="m-3" id={id} onChange={onChange} {...other} />
      {errorMessage && (
        <p className="text-red-500 text-sm ml-3">{errorMessage}</p>
      )}
    </>
  );
};

export default InputForm;
