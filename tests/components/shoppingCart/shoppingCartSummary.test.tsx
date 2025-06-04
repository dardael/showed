import React, { act } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShoppingCartSummary from 'showed/components/shoppingCart/shoppingCartSummary';

describe('ShoppingCartSummary', () => {
    it('renders the table with the correct headers', async () => {
        await act(async () => render(<ShoppingCartSummary products={[]} />));

        // Verify table headers
        expect(screen.getByText('Produit')).toBeInTheDocument();
        expect(screen.getByText('Quantité')).toBeInTheDocument();
        expect(screen.getByText('Prix (€)')).toBeInTheDocument();
    });

    it('renders the product details correctly', async () => {
        const products = [
            {
                product: {
                    _id: '1',
                    name: 'Product 1',
                    price: 10,
                    description: ' ',
                    imageId: ' ',
                },
                quantity: 3,
            },
            {
                product: {
                    _id: '2',
                    name: 'Product 2',
                    price: 20,
                    description: ' ',
                    imageId: ' ',
                },
                quantity: 1,
            },
        ];

        await act(async () =>
            render(<ShoppingCartSummary products={products} />)
        );

        // Verify product rows
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument(); // 10 * 2

        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument(); // 20 * 1
    });

    it('calculates and displays the total price correctly', async () => {
        const products = [
            {
                product: {
                    _id: '1',
                    name: 'Product 1',
                    price: 10,
                    description: ' ',
                    imageId: ' ',
                },
                quantity: 2,
            },
            {
                product: {
                    _id: '2',
                    name: 'Product 2',
                    price: 20,
                    description: ' ',
                    imageId: ' ',
                },
                quantity: 1,
            },
        ];

        await act(async () =>
            render(<ShoppingCartSummary products={products} />)
        );

        // Verify total price
        expect(screen.getByText('40.00')).toBeInTheDocument(); // (10 * 2) + (20 * 1)
    });

    it('renders an empty table when no products are provided', async () => {
        await act(async () => render(<ShoppingCartSummary products={[]} />));

        // Verify no product rows
        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Product 2')).not.toBeInTheDocument();

        // Verify total price is 0
        expect(screen.getByText('0.00')).toBeInTheDocument();
    });
});
