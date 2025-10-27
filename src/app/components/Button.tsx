import { MouseEventHandler } from 'react';
import { en } from '../lang';

interface ButtonProps {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ clickHandler }: ButtonProps) => {
  return (
    <button
      data-testid="scan-button"
      className="absolute cursor-pointer w-[18%] h-[14%] bg-green-500 top-[76.5%] left-[12.5%] flex items-center justify-center [container-type:size]"
      onClick={clickHandler}
    >
      <span className="text-[calc(23cqi+23cqb)] leading-none">{en.scan}</span>
    </button>
  );
};

export default Button;
