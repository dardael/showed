'use client';
import {
    Card,
    CardBody,
    Flex,
    Spinner,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getProducts } from 'showed/controllers/product/productController';
import { Block as BlockModel } from 'showed/lib/page/models/block';
import { Product } from 'showed/lib/product/models/product';
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
                                        <Button>Ajouter au panier</Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        ))}
                    </Flex>
                </>
            )}
        </>
    );
}
