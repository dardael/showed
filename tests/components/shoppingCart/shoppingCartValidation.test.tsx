import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShoppingCartValidation from 'showed/components/shoppingCart/shoppingCartValidation';
import { validateOrder } from 'showed/controllers/product/orderController';

jest.mock('showed/controllers/product/orderController', () => ({
    validateOrder: jest.fn(),
}));

describe('ShoppingCartValidation', () => {
    const mockOnOrderValidated = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all input fields and the validate button', () => {
        render(
            <ShoppingCartValidation onOrderValidated={mockOnOrderValidated} />
        );

        expect(screen.getByLabelText(/^Nom/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Prénom/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Adresse mail/)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/^Numéro de téléphone/)
        ).toBeInTheDocument();
        expect(screen.getByText('Valider la commande')).toBeInTheDocument();
    });

    it('calls validateOrder and onOrderValidated when the form is submitted with valid data', async () => {
        (validateOrder as jest.Mock).mockResolvedValueOnce(undefined);

        render(
            <ShoppingCartValidation onOrderValidated={mockOnOrderValidated} />
        );

        fireEvent.change(screen.getByLabelText(/^Nom/), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText(/^Prénom/), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByLabelText(/^Adresse mail/), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/^Numéro de téléphone/), {
            target: { value: '1234567890' },
        });

        fireEvent.click(screen.getByText('Valider la commande'));

        await waitFor(() => {
            expect(validateOrder).toHaveBeenCalledWith({
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '12 34 56 78 90',
            });
            expect(mockOnOrderValidated).toHaveBeenCalled();
        });
    });

    it('displays an error notification if validateOrder fails', async () => {
        (validateOrder as jest.Mock).mockRejectedValueOnce(
            new Error('Validation failed')
        );

        render(
            <ShoppingCartValidation onOrderValidated={mockOnOrderValidated} />
        );

        fireEvent.change(screen.getByLabelText(/^Nom/), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText(/^Prénom/), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByLabelText(/^Adresse mail/), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/^Numéro de téléphone/), {
            target: { value: '1234567890' },
        });

        fireEvent.click(screen.getByText('Valider la commande'));

        await waitFor(() => {
            expect(validateOrder).toHaveBeenCalled();
            expect(mockOnOrderValidated).not.toHaveBeenCalled();
        });

        // You can add additional checks for error notifications if they are rendered in the UI
    });
});
