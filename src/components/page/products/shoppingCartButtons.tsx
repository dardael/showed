import React, { useEffect, useState } from 'react';
import { ButtonGroup, IconButton, Spinner, Text } from '@chakra-ui/react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import {
    addProductToCache,
    removeProductFromCache,
    getProductCount,
} from 'showed/controllers/product/shoppingCartController';
import { Product } from 'showed/lib/product/models/product';

export default function ShoppingCartButtons({ product }: { product: Product }) {
    const [productCount, setProductCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getProductCount(product).then((count) => {
            setProductCount(count);
            setIsLoading(false);
        });
    }, [product]);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <ButtonGroup spacing='4' alignItems='center'>
                    <IconButton
                        aria-label='Supprimer le produit'
                        icon={productCount > 1 ? <FaMinus /> : <FaTrash />}
                        isDisabled={productCount === 0}
                        onClick={async () => {
                            await removeProductFromCache(product);
                            setProductCount(productCount - 1);
                        }}
                    />
                    <Text fontSize='lg' fontWeight='bold'>
                        {productCount}
                    </Text>
                    <IconButton
                        aria-label='Ajouter le produit'
                        icon={<FaPlus />}
                        onClick={async () => {
                            await addProductToCache(product);
                            setProductCount(productCount + 1);
                        }}
                    />
                </ButtonGroup>
            )}
        </>
    );
}
