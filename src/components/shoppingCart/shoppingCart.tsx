'use client';
import ShoppingCartSummary from './shoppingCartSummary';
import ShoppingCartValidation from './shoppingCartValidation';
import { useEffect, useState } from 'react';
import { getProductsFromCache } from 'showed/controllers/product/shoppingCartController';
import { Product } from 'showed/lib/product/models/product';
import ShoppingCartValidated from './shoppingCartValidated';
import Loading from '../core/feedback/loading';

export default function ShoppingCart() {
    const [isOrderValidated, setIsOrderValidated] = useState<boolean>(false);
    const [shoppingCart, setShoppingCart] = useState<
        { product: Product; quantity: number }[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getProductsFromCache().then((products) => {
            setShoppingCart(products);
            setIsLoading(false);
        });
    }, []);

    return (
        <Loading isLoading={isLoading}>
            {!isOrderValidated && (
                <>
                    <ShoppingCartSummary products={shoppingCart} />
                    <ShoppingCartValidation
                        onOrderValidated={() => setIsOrderValidated(true)}
                    />
                </>
            )}
            {isOrderValidated && (
                <ShoppingCartValidated shoppingCart={shoppingCart} />
            )}
        </Loading>
    );
}
