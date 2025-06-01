import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCartValidated from 'showed/components/shoppingCart/shoppingCartValidated';
import { ThemeContext } from 'showed/app/providers';
import { WebsiteMode } from 'showed/lib/theme/models/websiteMode';
import { Color } from 'showed/lib/theme/models/color';

describe('ShoppingCartValidated', () => {
    const mockTheme = {
        color: Color.blue,
        websiteMode: WebsiteMode.INVITATION,
    };
    const mockShoppingCart = [
        {
            product: {
                _id: '1',
                name: 'Product 1',
                price: 10,
                description: '',
                imageId: '',
            },
            quantity: 2,
        },
        {
            product: {
                _id: '2',
                name: 'Product 2',
                price: 20,
                description: '',
                imageId: '',
            },
            quantity: 1,
        },
    ];

    const renderComponent = (shoppingCart = mockShoppingCart) => {
        return render(
            <ThemeContext.Provider
                value={{ theme: mockTheme, setThemeColor: () => {} }}
            >
                <ShoppingCartValidated shoppingCart={shoppingCart} />
            </ThemeContext.Provider>
        );
    };

    it('renders the heading and text correctly', () => {
        renderComponent();

        expect(
            screen.getByText('Merci pour votre commande !')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Votre commande a été validée avec succès.')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Voici les détails de votre commande :')
        ).toBeInTheDocument();
    });

    it('renders the ShoppingCartSummary component with the correct products', () => {
        renderComponent();

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders the button with the correct text and redirects on click', () => {
        renderComponent();

        const button = screen.getByText("Retour à la page d'accueil");
        expect(button).toBeInTheDocument();

        // Mock window.location.href
        window.location.href = '';

        fireEvent.click(button);
        expect(new URL(window.location.href, 'http://localhost').pathname).toBe(
            '/'
        );
    });

    it('renders correctly with an empty shopping cart', () => {
        renderComponent([]);

        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });
});
