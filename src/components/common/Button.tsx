import React, { ReactNode } from 'react';
import cx from 'clsx';

type IColor = keyof typeof colors;
type ITextColor = keyof typeof textColors;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  color?: IColor;
  textColor?: ITextColor;
}

const colors = {
  primary: 'bg-[#87A9FF]',
  success: 'bg-[#455BB5]',
  success2: 'bg-[#477ED7]',
  success3: 'bg-[#1AB2FF]',
  success4: 'bg-[#F7EE3C]',
  success5: 'bg-[#EEE420]',
  success6: 'bg-[#33E7FF]',
  success7: 'bg-[#F6C707]',
  cancelBorder: 'border border-[#D1D5DC]',
};

const textColors = {
  white: 'text-white',
  black: 'text-black',
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'primary',
  children,
  textColor = 'black',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={cx(
        'btn px-4 py-2 rounded-lg text-base',
        colors[color],
        textColors[textColor],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
