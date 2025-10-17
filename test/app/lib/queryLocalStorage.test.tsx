import { LOCALSTORAGE_KEY } from '@/src/app/constants';
import checkPokemonIsInLocalStorage from '@/src/lib/queryLocalStorage';

describe('queryLocalStorage', () => {
  describe('checkPokemonIsInLocalStorage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

    it.only('returns pokemon data if the pokemon is already in localstorage', () => {
      const randomPokemonNumber = 1;
      const expectedData = 
        {
          entry_number: randomPokemonNumber,
          name: 'bulbasaur',
          flavorText:
            'A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.',
          soundFile:
            'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        }
      ;

      getItemSpy.mockReturnValue(JSON.stringify([expectedData]));

      const retrievedData = checkPokemonIsInLocalStorage(randomPokemonNumber);

      expect(localStorage.getItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY);
      expect(retrievedData).toStrictEqual(expectedData);
    });

    it('returns null if there is no localstorage data', () => {});

    it('returns null if the pokemon is not in localstorage', () => {
      const randomPokemonNumber = 1;
      const localStorageReturnValue = [
        {
          entry_number: 4,
          name: 'charmander',
          flavorText: '',
          soundFile: '',
          sprite: ''
        }
      ];

      getItemSpy.mockReturnValue(JSON.stringify(localStorageReturnValue));
      const retrievedData = checkPokemonIsInLocalStorage(randomPokemonNumber);
      expect(retrievedData).toBeNull();
    });
  });
});
