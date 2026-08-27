import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountPage from './page';

describe('Account Settings Page', () => {
  it('renders correctly', () => {
    render(<AccountPage />);
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields on submit', async () => {
    render(<AccountPage />);
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('shows email validation error for invalid email', async () => {
    render(<AccountPage />);
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('submits successfully with valid data', async () => {
    render(<AccountPage />);
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Settings saved successfully!');
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    });
  });
});
