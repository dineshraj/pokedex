import Image from 'next/image';
import Button from './Button';

// import '../styles/components/pokedex.scss'
// import { Pokedex } from 'pokenode-ts';
// import Button from './Button';

export interface Pokedex {
  name: string;
  url: string;
}



const PokedexComponent = ({ pokedex }: { pokedex: Pokedex[] }) => {
  /*
    on initial render (useEffect) i should store it in state
    when they click the button
    get a random number between 1-151
    check localstorage for whether the pokemon has already been seen
    otherwise request it
    otherwise use it
  */

  const imageStyle = {
    width: 'auto',
    height: '100%',
    maxWidth: 'fit-content'
  };

  return (
    <div
      className="pokedex relative flex w-[80vw] h-[80vh] justify-center"
      data-testid="pokedex"
    >
      <div className="pokedex-elements relative w=[100%] h=[100%]">
        <Image
          src="/pokedex.svg"
          data-testid="pokedex-image"
          alt="pokedex"
          priority
          width="50"
          height="50"
          style={imageStyle}
        />
        <Button clickHandler={} />
      </div>
    </div>
  );
};

export default PokedexComponent;
