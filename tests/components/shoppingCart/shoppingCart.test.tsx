import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ShoppingCart from 'showed/components/shoppingCart/shoppingCart';
import { getProductsFromCache } from 'showed/controllers/product/shoppingCartController';
import { act } from 'react';

// Mock dependencies
jest.mock('showed/controllers/product/shoppingCartController', () => ({
    getProductsFromCache: jest.fn(),
}));

jest.mock('showed/components/shoppingCart/shoppingCartSummary', () => {
    const MockShoppingCartSummary = () => <div>ShoppingCartSummary</div>;
    MockShoppingCartSummary.displayName = 'ShoppingCartSummary';
    return MockShoppingCartSummary;
});
jest.mock('showed/components/shoppingCart/shoppingCartValidation', () => {
    const mock = ({ onOrderValidated }: { onOrderValidated: () => void }) => (
        <button onClick={onOrderValidated}>Validate Order</button>
    );
    mock.displayName = 'ShoppingCartValidation';
    return mock;
});
jest.mock('showed/components/shoppingCart/shoppingCartValidated', () => {
    const mock = () => <div>ShoppingCartValidated</div>;
    mock.displayName = 'ShoppingCartValidated';
    return mock;
});

jest.mock('showed/components/core/feedback/loading', () => {
    const MockLoading = ({
        isLoading,
        children,
    }: {
        isLoading: boolean;
        children: React.ReactNode;
    }) => <>{isLoading ? <div>Loading...</div> : children}</>;
    MockLoading.displayName = 'Loading';
    return MockLoading;
});

describe('ShoppingCart', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays a loading spinner while fetching products', async () => {
        let resolveFunction: (
            value: { product: { name: string }; quantity: number }[]
        ) => void = () => {};

        // Create a promise and store its resolve function
        const promise = new Promise<
            { product: { name: string }; quantity: number }[]
        >((resolve) => {
            resolveFunction = resolve;
        });

        // Mock the function to return the promise
        (getProductsFromCache as jest.Mock).mockReturnValueOnce(promise);
        await act(async () => render(<ShoppingCart />));
        // Verify spinner is displayed
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
        // Wait for loading to complete
        resolveFunction([]);
        await waitFor(() =>
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        );
    });

    it('renders the shopping cart summary after loading', async () => {
        (getProductsFromCache as jest.Mock).mockResolvedValue([
            { product: { name: 'Product 1' }, quantity: 1 },
        ]);
        await act(async () => render(<ShoppingCart />));

        // Wait for loading to complete
        await waitFor(() =>
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        );

        // Verify shopping cart summary is displayed
        expect(screen.queryByText('ShoppingCartSummary')).toBeInTheDocument();
    });

    it('handles order validation and displays the validated component', async () => {
        (getProductsFromCache as jest.Mock).mockResolvedValue([
            { product: { name: 'Product 1' }, quantity: 1 },
        ]);
        await act(async () => render(<ShoppingCart />));

        // Wait for loading to complete
        await waitFor(() =>
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        );

        // Click the validate order button
        await act(async () =>
            userEvent.click(screen.getByText('Validate Order'))
        );

        // Verify the validated component is displayed
        expect(screen.queryByText('ShoppingCartValidated')).toBeInTheDocument();
    });
});
