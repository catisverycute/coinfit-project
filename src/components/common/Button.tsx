import React, { ReactNode } from 'react';
import cx from 'clsx';

type IColor = keyof typeof colors;
type ITextColor = keyof typeof textColors;
type IVariant = keyof typeof variants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  color?: IColor;
  textColor?: ITextColor;
  variant?: IVariant;
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

const variants = {
  keypad: 'bg-white px-2 py-10 text-4xl lg:py-5 lg:text-2xl ',
  primaryBtn: 'bg-[#87A9FF] px-4 py-2 rounded-lg  text-base',
  back: 'p-0 btn-ghost bg-transparent border-none  hover:shadow-none',
  text: 'btn-ghost bg-transparent border-none  hover:shadow-none text-xl font-normal py-8',
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'primary',
  children,
  textColor = 'black',
  className,
  variant,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={cx(
        'btn',
        variant && variants[variant],
        !variant && colors[color],
        textColors[textColor],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
