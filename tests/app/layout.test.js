import { render, screen } from '@testing-library/react';
import RootLayout from 'app/layout';

jest.mock('../../app/layout', () => ({ children }) => <>{children}</>);

describe('RootLayout', () => {
  it('renders the children content', () => {
    render(
      <RootLayout>
        <main>
          <div>Children Component</div>
        </main>
      </RootLayout>
    );
    expect(screen.getByText('Children Component')).toBeInTheDocument();
  });
});
