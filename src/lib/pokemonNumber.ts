const MIN = 1;
const MAX = 151;


const getRandomPokemonNumber = () => {
  const randomNumberFromZero = Math.random() * (MAX - MIN + 1);

  return Math.floor(randomNumberFromZero) + min;
}

export default getRandomPokemonNumber;