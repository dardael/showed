import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AggregatedProducts from 'showed/components/order/aggregatedProducts';

describe('AggregatedProducts Component', () => {
    it('renders aggregated products with total quantities', () => {
        const mockOrders = [
            {
                _id: 'order1',
                products: [
                    {
                        product: { _id: 'product1', name: 'Apple' },
                        quantity: 2,
                    },
                    {
                        product: { _id: 'product2', name: 'Banana' },
                        quantity: 3,
                    },
                ],
            },
            {
                _id: 'order2',
                products: [
                    {
                        product: { _id: 'product1', name: 'Apple' },
                        quantity: 1,
                    },
                    {
                        product: { _id: 'product3', name: 'Cherry' },
                        quantity: 5,
                    },
                ],
            },
        ];

        render(<AggregatedProducts orders={mockOrders} />);

        // Check if the aggregated products are rendered
        expect(screen.getByText('Apple (x3)')).toBeInTheDocument();
        expect(screen.getByText('Banana (x3)')).toBeInTheDocument();
        expect(screen.getByText('Cherry (x5)')).toBeInTheDocument();
    });

    it('renders products sorted by name', () => {
        const mockOrders = [
            {
                _id: 'order1',
                products: [
                    {
                        product: { _id: 'product2', name: 'Banana' },
                        quantity: 1,
                    },
                    {
                        product: { _id: 'product3', name: 'Cherry' },
                        quantity: 1,
                    },
                ],
            },
            {
                _id: 'order2',
                products: [
                    {
                        product: { _id: 'product1', name: 'Apple' },
                        quantity: 1,
                    },
                ],
            },
        ];

        render(<AggregatedProducts orders={mockOrders} />);

        // Get all product elements
        const productElements = screen.getAllByText(/(x\d+)/);

        // Check if they are sorted alphabetically by name
        expect(productElements[0]).toHaveTextContent('Apple (x1)');
        expect(productElements[1]).toHaveTextContent('Banana (x1)');
        expect(productElements[2]).toHaveTextContent('Cherry (x1)');
    });

    it('renders nothing if no orders are provided', () => {
        render(<AggregatedProducts orders={[]} />);

        // Check that no products are rendered
        expect(screen.queryByText(/(x\d+)/)).not.toBeInTheDocument();
    });
});
