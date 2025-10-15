import checkPokemonIsInLocalStorage from "@/src/lib/queryLocalStorage";

describe('queryLocalStorage', () => {
  describe('checkPokemonIsInLocalStorage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

    it('returns pokemon data if the pokemon is already in localstorage', () => {
      const randomPokemonNumber = 1;
      const expectedData = {
        entry_number: randomPokemonNumber,
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
      };
      getItemSpy.mockReturnValue(JSON.stringify(expectedData));

      const retrievedData = checkPokemonIsInLocalStorage(randomPokemonNumber)

      expect(retrievedData).toStrictEqual(expectedData);
    });
  });
});
