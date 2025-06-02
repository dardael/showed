import React, { act } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShoppingCartValidation from 'showed/components/shoppingCart/shoppingCartValidation';
import { validateOrder } from 'showed/controllers/product/orderController';

// Mock the validateOrder function
jest.mock('showed/controllers/product/orderController', () => ({
    validateOrder: jest.fn(),
}));

describe('ShoppingCartValidation', () => {
    const mockOnOrderValidated = jest.fn();

    const renderComponent = () => {
        render(
            <ShoppingCartValidation onOrderValidated={mockOnOrderValidated} />
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all input fields and the button', async () => {
        await act(async () => renderComponent());

        expect(
            screen.getByPlaceholderText('Veuillez renseigner votre nom')
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Veuillez renseigner votre prénom')
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(
                'Veuillez renseigner votre adresse mail'
            )
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(
                'Veuillez renseigner votre numéro de téléphone'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Valider la commande')).toBeInTheDocument();
    });

    it('updates the customer state when inputs are changed', async () => {
        await act(async () => renderComponent());

        const nameInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre nom'
        );
        const surnameInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre prénom'
        );
        const emailInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre adresse mail'
        );
        const phoneInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre numéro de téléphone'
        );

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });

        expect(nameInput).toHaveValue('John');
        expect(surnameInput).toHaveValue('Doe');
        expect(emailInput).toHaveValue('john.doe@example.com');
        expect(phoneInput).toHaveValue('1234567890');
    });

    it('calls validateOrder and onOrderValidated when the button is clicked', async () => {
        (validateOrder as jest.Mock).mockResolvedValueOnce(undefined);
        await act(async () => renderComponent());

        const nameInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre nom'
        );
        const surnameInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre prénom'
        );
        const emailInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre adresse mail'
        );
        const phoneInput = screen.getByPlaceholderText(
            'Veuillez renseigner votre numéro de téléphone'
        );
        const button = screen.getByText('Valider la commande');

        // Fill in the form
        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });

        // Click the button
        fireEvent.click(button);

        // Assert validateOrder is called with the correct data
        await waitFor(async () =>
            expect(validateOrder).toHaveBeenCalledWith({
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
            })
        );

        // Assert onOrderValidated is called
        expect(mockOnOrderValidated).toHaveBeenCalled();
    });
});
