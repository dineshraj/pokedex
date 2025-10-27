import Image from 'next/image';

interface ScreenProps {
  spriteUrl: string;
  name: string;
}

const Screen = ({ spriteUrl, name }: ScreenProps) => {
  return (
    <div
      data-testid="pokedex-screen"
      className="absolute cursor-pointer w-[18%] h-[14%] top-[1%] left-[2.5%] flex items-center justify-center [container-type:size]"
    >
      <Image
        src={spriteUrl}
        data-testid="pokedex-screen-sprite"
        alt={name}
        priority
        width="50"
        height="50"
      />
      {/*       
      <img
        data-testid="pokedex-screen-sprite"
        src={spriteUrl}
        alt={name}
        className="absolute cursor-pointer w-[18%] h-[14%] top-[1%] left-[2.5%] flex items-center justify-center [container-type:size]"
      /> */}
    </div>
  );
};

export default Screen;
