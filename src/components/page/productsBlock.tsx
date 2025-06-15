'use client';
import { Button, Center, Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getProducts } from 'showed/controllers/product/productController';
import { Product } from 'showed/lib/product/models/product';
import ProductCard from '../admin/products/productCard';
import ShoppingCartButtons from './products/shoppingCartButtons';
import Link from 'next/link';
import Loading from '../core/feedback/loading';
export default function ProductsBlock() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
            setIsLoading(false);
        });
    }, []);

    return (
        <Loading isLoading={isLoading}>
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
                                    <ShoppingCartButtons product={product} />
                                }
                            />
                        ))}
                    </Flex>
                    <Center paddingTop={'40px'}>
                        {products.length > 0 && (
                            <Link href={'/shoppingCart'}>
                                <Button
                                    width={'100%'}
                                    borderStyle={'solid'}
                                    borderWidth={'2px'}
                                    borderColor={'white'}
                                >
                                    Voir le panier
                                </Button>
                            </Link>
                        )}
                    </Center>
                </Loading>
    );
}
