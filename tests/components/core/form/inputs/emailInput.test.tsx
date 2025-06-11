import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailInput from 'showed/components/core/form/inputs/emailInput';

describe('EmailInput Component', () => {
    test('renders the input field with placeholder', () => {
        render(<EmailInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre adresse email'
        );
        expect(inputElement).toBeInTheDocument();
    });

    test('displays an error message for invalid email', () => {
        render(<EmailInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre adresse email'
        );

        fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
        fireEvent.blur(inputElement);

        const errorMessage = screen.getByText('Adresse email invalide');
        expect(errorMessage).toBeInTheDocument();
    });

    test('does not display an error message for valid email', () => {
        render(<EmailInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre adresse email'
        );

        fireEvent.change(inputElement, {
            target: { value: 'test@example.com' },
        });
        fireEvent.blur(inputElement);

        const errorMessage = screen.queryByText('Adresse email invalide');
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('updates the input value on change', () => {
        render(<EmailInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre adresse email'
        );

        fireEvent.change(inputElement, {
            target: { value: 'test@example.com' },
        });
        expect(inputElement).toHaveValue('test@example.com');
    });

    test('error message disappears when input is focused again', () => {
        render(<EmailInput />);
        const inputElement = screen.getByPlaceholderText(
            'Entrez votre adresse email'
        );

        fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
        fireEvent.blur(inputElement);

        let errorMessage: HTMLElement | null = screen.getByText(
            'Adresse email invalide'
        );
        expect(errorMessage).toBeInTheDocument();

        fireEvent.focus(inputElement);
        errorMessage = screen.queryByText('Adresse email invalide');
        expect(errorMessage).not.toBeInTheDocument();
    });
});
