'use client';
import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getProducts } from 'showed/controllers/product/productController';
import { Block as BlockModel } from 'showed/lib/page/models/block';
import { Product } from 'showed/lib/product/models/product';
import ProductCard from '../admin/products/productCard';
import ShoppingCartButtons from './products/shoppingCartButtons';
export default function ProductsBlock({ block }: { block: BlockModel }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
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
                <>
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
                </>
            )}
        </>
    );
}
