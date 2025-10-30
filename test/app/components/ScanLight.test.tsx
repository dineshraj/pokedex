import ScanLight from '@/src/app/components/ScanLight';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

describe('ScanLight', () => {
  it('renders the scan light', () => {
    render(<ScanLight loading={false} />);

    const scanLight = screen.queryByTestId('scan-light');

    expect(scanLight).toBeVisible();
  });

  it('renders the highlight in the light', () => {
    render(<ScanLight loading={false} />);
    const scanLightHighlight = screen.queryByTestId('scan-light-highlight');

    expect(scanLightHighlight).toBeVisible();
  });

  it('renders the scan light as blinking when loading is true', () => {
    render(<ScanLight loading={true} />);
    const scanLightHighlightClass = screen.queryByTestId('scan-light')?.getAttribute('class');  

    expect(scanLightHighlightClass).toContain('animate-ping opacity-75')
  })
  // it('renders the scan light as not blinking when loading is false')
});
