'use client';
import { Box, Button, ButtonGroup, Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProductModal from './productModal';
import { Product } from 'showed/lib/product/models/product';
import {
    deleteProduct,
    getProducts,
} from 'showed/controllers/product/productController';
import ProductCard from './productCard';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onProductSaved = (product: Product) => {
        setProducts([...products, product]);
    };

    async function removeProduct(productId: string) {
        await deleteProduct(productId);
        setProducts([
            ...products.filter((product) => product._id !== productId),
        ]);
    }

    function onProductModified(product: Product) {
        setProducts([
            ...products.map((p) => (p._id === product._id ? product : p)),
        ]);
    }

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading && <Spinner size='xl' />}
            {!isLoading && (
                <Box padding={'40px'}>
                    <ProductModal
                        initialProduct={null}
                        onProductSaved={onProductSaved}
                    />
                    <Flex
                        flexWrap={'wrap'}
                        gap={'30px'}
                        paddingTop={'20px'}
                        justifyContent={'center'}
                    >
                        {products.map((product) => (
                            <ProductCard
                                product={product}
                                key={product._id}
                                footer={
                                    <ButtonGroup spacing='2'>
                                        <ProductModal
                                            initialProduct={product}
                                            onProductSaved={onProductModified}
                                        />
                                        <Button
                                            variant='ghost'
                                            onClick={() =>
                                                removeProduct(
                                                    product._id as string
                                                )
                                            }
                                        >
                                            Supprimer
                                        </Button>
                                    </ButtonGroup>
                                }
                            />
                        ))}
                    </Flex>
                </Box>
            )}
        </>
    );
}
