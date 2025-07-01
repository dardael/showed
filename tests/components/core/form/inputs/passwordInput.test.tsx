import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordInput from 'showed/components/core/form/inputs/passwordInput';

describe('PasswordInput Component', () => {
    test('renders the input field with placeholder', () => {
        render(<PasswordInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre mot de passe'
        );
        expect(inputElement).toBeInTheDocument();
    });

    test('toggles password visibility', () => {
        render(<PasswordInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre mot de passe'
        );
        const toggleButton = screen.getByRole('button');
        expect(inputElement).toHaveAttribute('type', 'password');
        fireEvent.click(toggleButton);
        expect(inputElement).toHaveAttribute('type', 'text');
        fireEvent.click(toggleButton);
        expect(inputElement).toHaveAttribute('type', 'password');
    });
});
