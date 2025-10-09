import Button from '@/src/app/components/Button';
import { render, screen, fireEvent } from '@testing-library/react';

import { en } from '@/src/app/lang';
const mockClickHandler = jest.fn();

const renderComponent = () => {
  return render(<Button clickHandler={mockClickHandler} />);
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
  });
});
