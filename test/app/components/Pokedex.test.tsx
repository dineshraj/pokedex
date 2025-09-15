import { render } from '@testing-library/react';
import PokedexComponent, { api } from '../../../src/components/Pokedex';

describe('Pokedex', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls the pokenode api with the right value', () => {
    const expectedParam = 2;
    const getPokedexByIdSpy = jest.spyOn(api, 'getPokedexById');

    render(<PokedexComponent />);

    expect(getPokedexByIdSpy).toHaveBeenCalledWith(expectedParam);
  });

  // it('calls localStorage setItem if the key does not exist', () => {
  //   const generationKey = 'kandoPokedex';
  //   const localStorageSpy = jest.spyOn(global, 'Storage');

  //   render(<PokedexComponent />);

  //   expect(localStorageSpy).toHaveBeenCalledWith(generationKey, '');
  // });
});