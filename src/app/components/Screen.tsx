import Image from 'next/image';

interface ScreenProps {
  spriteUrl: string;
  name: string;
}

const Screen = ({ spriteUrl, name }: ScreenProps) => {
  return (
    <div
      data-testid="pokedex-screen"
      className="absolute cursor-pointer w-[27.1%] h-[25.4%] top-[34.3%] left-[10.88%] flex items-center justify-center [container-type:size] bg-[#6fb1dc]"
    >
      <Image
        src={spriteUrl}
        data-testid="pokedex-screen-sprite"
        alt={name}
        priority
        width="100"
        height="100"
      />
    </div>
  );
};

export default Screen;
