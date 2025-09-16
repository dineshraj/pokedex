import { GameClient, POKEDEXES } from 'pokenode-ts';
import PokedexComponent from '../components/Pokedex';
import '../styles/page.scss';

export const api = new GameClient();
const generationID = POKEDEXES.KANTO;

const Page = async () => {
  const pokedex = await api.getPokedexById(generationID);

  return (
    <div data-testid="pokedex">
      <div className="flex items-center min-h-screen justify-center">
        <main className="flex flex-col row-start-2 sm:items-start">
          <div className="pokedex-container m-8 relative">
            <PokedexComponent pokedex={pokedex} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
