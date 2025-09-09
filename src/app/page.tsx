import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex font-sans items-center min-h-screen justify-center">
      <main className="flex flex-col row-start-2 sm:items-start">
        <div className="pokedex-container m-8">
          <Image
            src="/pokedex.svg"
            // fill={true}
            alt="pokedex"
            priority
            width="1178"
            height="891"
          />
        </div>
      </main>
    </div>
  );
}
