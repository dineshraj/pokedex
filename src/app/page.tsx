import Image from 'next/image';
import { GameClient, POKEDEXES } from 'pokenode-ts';

/*
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>
 
export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}
*/

export const getServerSideProps = async () => {
  const api = new GameClient();
  // Fetch data from external API

  try {
    const pokedex = await api.getPokedexById(POKEDEXES.KANTO);

    if (localStorage.getItem('kantoPokedex') === null) {
      localStorage.setItem('kantoPokedex', JSON.stringify(pokedex));
    }
    // Pass data to the page via props
    return { props: pokedex };
  } catch (e) {
    console.error('Could not fetch Pokédex');
  }
};

interface Pokedex {}

const Home = ({ pokedex }: { pokedex: Pokedex }) => {
  // const api = new GameClient();

  // try {
  //   const pokedex = await api.getPokedexById(POKEDEXES.KANTO);

  //   if (localStorage.getItem('kantoPokedex') === null) {
  //     localStorage.setItem('kantoPokedex', JSON.stringify(pokedex));
  //   }
  // } catch (e) {
  //   console.error('Could not fetch Pokédex');
  // }
  return (
    <div data-testid="pokedex">
      <div className="flex items-center min-h-screen justify-center">
        <main className="flex flex-col row-start-2 sm:items-start">
          <div className="pokedex-container m-8">
            <Image
              src="/pokedex.svg"
              alt="pokedex"
              priority
              width="1178"
              height="891"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
