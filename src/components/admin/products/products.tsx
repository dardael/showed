'use client';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Heading,
    Image,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProductModal from './productModal';
import { Product } from 'showed/lib/product/models/product';
import {
    deleteProduct,
    getProducts,
} from 'showed/controllers/product/productController';

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
                            <Card key={product._id}>
                                <CardBody>
                                    <Image
                                        alt='Image du produit'
                                        src={`api/image/${product.imageId}`}
                                        height={'250px'}
                                        width={'370px'}
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>
                                            {product.name}
                                        </Heading>
                                        <Text>{product.description}</Text>
                                        <Text fontSize='2xl'>
                                            {product.price}€
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
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
                                </CardFooter>
                            </Card>
                        ))}
                    </Flex>
                </Box>
            )}
        </>
    );
}
