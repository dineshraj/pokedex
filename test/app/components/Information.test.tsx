import Information from '@/src/app/components/Information';
import { render, screen } from '@testing-library/react';
import { deselectOptions } from '@testing-library/user-event/dist/cjs/utility/selectOptions.js';

describe('Information', () => {
  it('renders the information component', () => {
    render(<Information loading={false} name="" description="" />);

    const information = screen.queryByTestId('information');

    expect(information).toBeVisible();
  });

  it('displays the pokemon name', () => {
    render(<Information loading={false} name="dineshraj" description="" />);

    const information = screen.queryByTestId('information');

    expect(information).toHaveTextContent('dineshraj')
  })

  it('displays the pokemon description', () => {
    const description = "he is a amazing and underated human who has a lot of potential"
    render(<Information loading={false} name="dineshraj" description={description} />);

    const information = screen.queryByTestId('information');

    expect(information).toHaveTextContent(description)
  })

  it('replaces special characters with spaces', () => {
    const description = "The plant blooms\nwhen it is\nabsorbing solar\u000cenergy. It stays\non the move to\nseek sunlight."

    const information = screen.queryByTestId('information');

    expect(information).toHaveTextContent(description)
  })

});
