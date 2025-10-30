import { MouseEventHandler } from 'react';
import { en } from '../lang';

interface ButtonProps {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  buttonDisabled: boolean;
}

const Button = ({ clickHandler, buttonDisabled }: ButtonProps) => {

  return (
    <button
      disabled={buttonDisabled}
      data-testid="scan-button"
      className="absolute cursor-pointer w-[18%] h-[14%] bg-green-500 top-[76.2%] left-[12.5%] flex items-center justify-center [container-type:size] shadow-xl/30"
      onClick={clickHandler}
    >
      {/* <span className="text-[calc(23cqi+23cqb)] leading-none font-serif">{en.scan}</span> */}
      <span className="text-[calc(23cqi+2cqb)] font-serif">{en.scan}</span>
    </button>
  );
};

export default Button;
