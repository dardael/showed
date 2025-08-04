import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from 'showed/components/core/form/loginForm';
import { login } from 'showed/controllers/authentification/loginController';

jest.mock('showed/controllers/authentification/loginController', () => ({
    login: jest.fn(),
    isAlreadyAuthentified: jest.fn().mockResolvedValue(false),
}));

jest.mock('showed/lib/frontend/core/authentification', () => ({
    generateFingerprint: jest.fn().mockResolvedValue('mockedFingerprint'),
}));

describe('LoginForm', () => {
    it('calls onLogin with form data', async () => {
        (login as jest.Mock).mockResolvedValue(true);
        const onLogin = jest.fn().mockResolvedValue(undefined);
        render(<LoginForm onLogin={onLogin} />);

        await waitFor(() =>
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        );

        fireEvent.change(screen.getByLabelText('email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(
            screen.getByPlaceholderText(/entrez votre mot de passe/i),
            { target: { value: 'password123' } }
        );
        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => expect(onLogin).toHaveBeenCalled());
    });
});
