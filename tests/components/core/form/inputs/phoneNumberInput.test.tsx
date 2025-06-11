import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PhoneNumberInput from 'showed/components/core/form/inputs/phoneNumberInput';

describe('PhoneNumberInput Component', () => {
    test('renders the input field with placeholder', () => {
        render(<PhoneNumberInput />);
        const inputElement = screen.getByPlaceholderText('xx xx xx xx xx');
        expect(inputElement).toBeInTheDocument();
    });

    test('formats input value correctly as phone number', () => {
        render(<PhoneNumberInput />);
        const inputElement = screen.getByPlaceholderText('xx xx xx xx xx');

        fireEvent.change(inputElement, { target: { value: '1234567890' } });
        expect(inputElement).toHaveValue('12 34 56 78 90');
    });

    test('displays an error message for invalid phone number', () => {
        render(<PhoneNumberInput />);
        const inputElement = screen.getByPlaceholderText('xx xx xx xx xx');

        fireEvent.change(inputElement, { target: { value: '123' } });
        fireEvent.blur(inputElement);

        const errorMessage = screen.getByText('Numéro de téléphone invalide');
        expect(errorMessage).toBeInTheDocument();
    });

    test('does not display an error message for valid phone number', () => {
        render(<PhoneNumberInput />);
        const inputElement = screen.getByPlaceholderText('xx xx xx xx xx');

        fireEvent.change(inputElement, { target: { value: '1234567890' } });
        fireEvent.blur(inputElement);

        const errorMessage = screen.queryByText('Numéro de téléphone invalide');
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('error message disappears when input is focused again', () => {
        render(<PhoneNumberInput />);
        const inputElement = screen.getByPlaceholderText('xx xx xx xx xx');

        fireEvent.change(inputElement, { target: { value: '123' } });
        fireEvent.blur(inputElement);

        let errorMessage: HTMLElement | null = screen.getByText(
            'Numéro de téléphone invalide'
        );
        expect(errorMessage).toBeInTheDocument();

        fireEvent.focus(inputElement);
        errorMessage = screen.queryByText('Numéro de téléphone invalide');
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('limits input to 14 characters (10 digits + 4 spaces)', () => {
        render(<PhoneNumberInput />);
        const inputElement = screen.getByPlaceholderText('xx xx xx xx xx');

        fireEvent.change(inputElement, {
            target: { value: '123456789012345' },
        });
        expect(inputElement).toHaveValue('12 34 56 78 90');
    });
});
