import Image from 'next/image';

interface ScreenProps {
  spriteUrl: string;
  name: string;
  loading: boolean;
}

const imageStyle = {
  width: 'auto',
  height: '100%',
  // maxWidth: 'fit-content',
  filter: 'drop-shadow(0px 0px 100px #27272c)'
};

const Screen = ({ spriteUrl, name, loading }: ScreenProps) => {
  return (
    <div
      data-testid="pokedex-screen"
      className="absolute w-[27.1%] h-[25.4%] top-[34.3%] left-[10.88%] flex items-center justify-center [container-type:size] bg-[#6fb1dc]"
    >
      {!loading && (
        <Image
          src={spriteUrl}
          data-testid="pokedex-screen-sprite"
          alt={name}
          priority
          width="100"
          height="100"
          style={imageStyle}
        />
      )}
    </div>
  );
};

export default Screen;
