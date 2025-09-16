import { GameClient } from 'pokenode-ts';
import PokedexComponent from '../components/Pokedex';
import '../styles/page.scss';
import { POKEDEX } from './constants';

type PageProps = {
  api?: Pick<GameClient, 'getPokedexById'>;
};

const Page = async ({ api = new GameClient() }: PageProps) => {
  const pokedex = await api.getPokedexById(POKEDEX);

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
