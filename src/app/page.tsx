'use client';

import Pokedex from '../components/Pokedex';
import '../styles/page.scss';

const Home = () => {
  // getPokedex(generationID);

  return (
    <div data-testid="pokedex">
      <div className="flex items-center min-h-screen justify-center">
        <main className="flex flex-col row-start-2 sm:items-start">
          <div className="pokedex-container m-8 relative">
            <Pokedex />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
