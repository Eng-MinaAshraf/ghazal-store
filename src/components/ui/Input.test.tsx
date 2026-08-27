import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Username" name="username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input label="Username" name="username" error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
