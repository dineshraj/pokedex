import getRandomPokemonNumber from '@/src/lib/pokemonNumber';

describe('pokemonNumber', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('returns a value from Math.random()', () => {
    const pokemonNumber = getRandomPokemonNumber();
    const expectedValue = 76;

    expect(pokemonNumber).toBe(expectedValue);
  });
});
