import { MouseEventHandler } from 'react';
import { en } from '../lang';

interface ButtonProps {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ clickHandler }: ButtonProps) => {
  return (
    <button
      data-testid="scan-button"
      className="absolute cursor-pointer w-[18%] h-[14%] bg-green-500 top-[76.5%] left-[12.5%]"
      onClick={clickHandler}
    >
      <span className="text-4xl tracking-wider font-mono">{en.scan}</span>
    </button>
  );
};

export default Button;
