import Button from '@/src/app/components/Button';
import { render, screen, fireEvent } from '@testing-library/react';

import { en } from '@/src/app/lang';
const mockClickHandler = jest.fn();

const renderComponent = (buttonDisabled: boolean = false) => {
  return render(
    <Button clickHandler={mockClickHandler} buttonDisabled={buttonDisabled} />
  );
};

describe('Button', () => {
  it('renders the button', () => {
    renderComponent();
    const button = screen.getByTestId('scan-button');
    expect(button).toBeVisible();
  });

  it('renders the text', () => {
    renderComponent();
    const button = screen.getByTestId('scan-button');
    expect(button).toHaveTextContent(en.scan);
  });

  it('calls the click handler when clicked', () => {
    renderComponent();
    const button = screen.getByTestId('scan-button');
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalled();
  });

  it('disables the button when the loadingPokemon prop is true', () => {
    renderComponent(true);
    const button = screen.getByTestId('scan-button');
    fireEvent.click(button);

    expect(mockClickHandler).not.toHaveBeenCalled();
  });
});
