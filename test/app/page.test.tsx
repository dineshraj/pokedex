import '@testing-library/jest-dom';
import { Pokedex } from 'pokenode-ts';

import { render, screen } from '@testing-library/react';

import { api } from '../../src/app/page';
import Home from '@/src/app/page';


// import { GameClient, POKEDEXES } from 'pokenode-ts';

// class GameClientMock {
//   constructor () {
//   }

//   getPokedexById () {
//     return jest.fn()
//   }
// }

// jest.mock('pokenode-ts');

// const GameClientMockPoo = jest.mock('pokenode-ts', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       GameClient: GameClientMock
//     };
//   });
// });

describe('Page', () => {
  let getPokedexByIdSpy: any;

  beforeEach(() => {
    getPokedexByIdSpy = jest
      .spyOn(api, 'getPokedexById')
      .mockResolvedValueOnce({ id: '2' } as unknown as Pokedex);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('renders the home page', async () => {
    const home = await Home();

    render(home);
    const appContainer = screen.queryByTestId('pokedex');
    expect(appContainer).toBeVisible();
  });

  it('calls the pokenode api with the right value', async () => {
    // const mockedGameClient = jest.mocked(GameClient);
    // const gameClientInstance = new mockedGameClient();
    // const GameClientMock = new GameClientMockPoo();
    // mockedGameClient.prototype.getPokedexById.mockResolvedValue({} as any);

    const expectedParam = 2;

    const home = await Home();
    render(home);

    expect(getPokedexByIdSpy).toHaveBeenCalledWith(expectedParam);

    // console.log("🚀 ~ getPokedexByIdSpy:", getPokedexByIdSpy)

    // expect(getPokedexByIdSpy).
    //({ id: expectedParam });

    // expect(gameClientInstance.api()).toHaveBeenCalledWith(expectedParam);
  });

  //   it('calls localStorage setItem if the key does not exist', () => {
  //     const generationKey = 'kandoPokedex';
  //     const localStorageSpy = jest.spyOn(global, 'Storage');

  //     const expectedParam = {
  //       id: 2,
  //       names: [
  //         {
  //           name: 'dineshraj',
  //           language: ''
  //         }
  //       ]
  //     };

  //     // getPokedexByIdSpy.mockResolvedValueOnce(expectedParam as unknown as Pokedex);
  //     // getPokedexByIdSpy.mockResolvedValueOnce(expectedParam as unknown as Pokedex);

  //     render(<PokedexComponent />);
  //     expect(getPokedexByIdSpy).toHaveBeenCalled();
  //     expect(localStorageSpy).toHaveBeenCalledWith(generationKey, expectedParam);
  // });
});
