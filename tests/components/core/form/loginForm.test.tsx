import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from 'showed/components/core/form/loginForm';
import { loginController } from 'showed/controllers/authentification/loginController';
jest.mock('showed/controllers/authentification/loginController', () => ({
    loginController: jest.fn(),
}));

describe('LoginForm', () => {
    it('calls onLogin with form data', async () => {
        (loginController as jest.Mock).mockResolvedValue(true);
        const onLogin = jest.fn().mockResolvedValue(undefined);
        render(<LoginForm onLogin={onLogin} />);

        fireEvent.change(screen.getByLabelText(/email/i), {
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
