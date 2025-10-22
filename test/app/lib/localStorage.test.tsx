import { LOCALSTORAGE_KEY } from '@/src/app/constants';
import {
  checkPokemonIsInLocalStorage,
  savePokemonToLocalstorage
} from '@/src/lib/localStorage';

const randomPokemonNumber = 1;

describe('queryLocalStorage', () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;

  describe('checkPokemonIsInLocalStorage', () => {
    beforeEach(() => {
      getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
      setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });

    it('returns pokemon data if the pokemon is already in localstorage', () => {
      const expectedData = {
        entry_number: randomPokemonNumber,
        name: 'bulbasaur',
        flavorText:
          'A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.',
        soundFile:
          'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
        sprite:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
      };
      getItemSpy.mockReturnValue(JSON.stringify([expectedData]));

      const retrievedData = checkPokemonIsInLocalStorage(randomPokemonNumber);

      expect(localStorage.getItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY);
      expect(retrievedData).toStrictEqual(expectedData);
    });

    it('returns null if there is no localstorage data at all', () => {
      getItemSpy.mockReturnValue(null);

      const retrievedData = checkPokemonIsInLocalStorage(randomPokemonNumber);

      expect(localStorage.getItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY);
      expect(retrievedData).toBeNull();
    });

    it('returns null if the pokemon is not in localstorage', () => {
      const localStorageReturnValue = [
        {
          entry_number: 4,
          name: 'charmander',
          flavorText: '',
          soundFile: 'sound-file',
          sprite: ''
        }
      ];

      getItemSpy.mockReturnValue(JSON.stringify(localStorageReturnValue));
      const retrievedData = checkPokemonIsInLocalStorage(randomPokemonNumber);
      expect(retrievedData).toBeNull();
    });

    it('sets the pokemon data correctly', () => {
      const newPokemonData = {
        entry_number: 4,
        name: 'charmander',
        flavorText: 'charrrr',
        soundFile: '',
        sprite: ''
      };

      savePokemonToLocalstorage(newPokemonData);
      expect(localStorage.getItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        LOCALSTORAGE_KEY,
        JSON.stringify([newPokemonData])
      );
    });

    it('adds to the existing store if pokemon already exist', () => {
      const localStorageReturnValue = [
        {
          entry_number: 1,
          name: 'charmander',
          flavorText: '',
          soundFile: '',
          sprite: ''
        }
      ];

      const newPokemonData = {
        entry_number: 4,
        name: 'pikachu',
        flavorText: 'pika',
        soundFile: '',
        sprite: ''
      };

      getItemSpy.mockReturnValue(JSON.stringify(localStorageReturnValue));

      savePokemonToLocalstorage(newPokemonData);

      expect(localStorage.getItem).toHaveBeenCalledWith(LOCALSTORAGE_KEY);
      expect(setItemSpy).toHaveBeenCalledWith(
        LOCALSTORAGE_KEY,
        JSON.stringify([...localStorageReturnValue, newPokemonData])
      );
    });
  });
});
