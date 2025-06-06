import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewOrders from 'showed/components/order/newOrders';
import {
    getOrders,
    setOrderState,
} from 'showed/controllers/product/orderController';
import { OrderState } from 'showed/lib/product/models/orderState';

// Mock the imported functions
jest.mock('showed/controllers/product/orderController', () => ({
    getOrders: jest.fn(),
    setOrderState: jest.fn(),
}));

// Mock the AggregatedProducts component
jest.mock('showed/components/order/aggregatedProducts', () => {
    return function MockAggregatedProducts() {
        return (
            <div data-testid='mock-aggregated-products'>
                Mock Aggregated Products
            </div>
        );
    };
});

describe('NewOrders Component', () => {
    const mockOrders = [
        {
            _id: 'order1',
            customer: {
                name: 'John',
                surname: 'Doe',
                phoneNumber: '123456789',
                email: 'john.doe@example.com',
            },
            products: [
                {
                    product: { _id: 'product1', name: 'Apple', price: 1.5 },
                    quantity: 2,
                },
                {
                    product: { _id: 'product2', name: 'Banana', price: 0.5 },
                    quantity: 3,
                },
            ],
            createdAt: '2023-10-01T10:00:00Z',
        },
        {
            _id: 'order2',
            customer: {
                name: 'Jane',
                surname: 'Smith',
                phoneNumber: null,
                email: null,
            },
            products: [
                {
                    product: { _id: 'product3', name: 'Cherry', price: 2.0 },
                    quantity: 5,
                },
            ],
            createdAt: '2023-10-02T12:00:00Z',
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', async () => {
        (getOrders as jest.Mock).mockResolvedValueOnce([]);

        render(<NewOrders />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() =>
            expect(getOrders).toHaveBeenCalledWith(OrderState.NEW)
        );
    });

    it('renders orders correctly', async () => {
        (getOrders as jest.Mock).mockResolvedValueOnce(mockOrders);

        render(<NewOrders />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Apple (x2)')).toBeInTheDocument();
            expect(screen.getByText('Banana (x3)')).toBeInTheDocument();
            expect(screen.getByText('Cherry (x5)')).toBeInTheDocument();
            expect(screen.getByText('10.00 €')).toBeInTheDocument(); // Total price for Cherry
        });
    });

    it('handles empty orders gracefully', async () => {
        (getOrders as jest.Mock).mockResolvedValueOnce([]);

        render(<NewOrders />);

        await waitFor(() => {
            expect(
                screen.getByText('Aucune nouvelle commande')
            ).toBeInTheDocument();
        });
    });

    it('validates an order', async () => {
        (getOrders as jest.Mock).mockResolvedValueOnce(mockOrders);
        (setOrderState as jest.Mock).mockResolvedValueOnce({});

        render(<NewOrders />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        const validateButton = screen.getAllByText('Valider')[0];
        fireEvent.click(validateButton);

        await waitFor(() => {
            expect(setOrderState).toHaveBeenCalledWith(
                'order1',
                OrderState.VALIDATED
            );
        });
    });

    it('cancels an order', async () => {
        (getOrders as jest.Mock).mockResolvedValueOnce(mockOrders);
        (setOrderState as jest.Mock).mockResolvedValueOnce({});

        render(<NewOrders />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        const cancelButton = screen.getAllByText('Annuler')[0];
        fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(setOrderState).toHaveBeenCalledWith(
                'order1',
                OrderState.CANCELLED
            );
        });
    });

    it('renders the mocked AggregatedProducts component', async () => {
        (getOrders as jest.Mock).mockResolvedValueOnce(mockOrders);

        render(<NewOrders />);

        await waitFor(() => {
            expect(
                screen.getByTestId('mock-aggregated-products')
            ).toBeInTheDocument();
        });
    });
});
