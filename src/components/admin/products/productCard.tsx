import React from 'react';
import {
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
} from '@chakra-ui/react';
import { Product } from 'showed/lib/product/models/product';
import Image from 'showed/components/core/image';

export default function ProductCard({
    product,
    footer,
}: {
    product: Product;
    footer: React.ReactNode;
}) {
    return (
        <Card>
            <CardBody>
                <Image
                    alt='Image du produit'
                    fileId={product.imageId}
                    height={'250px'}
                    width={'370px'}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.name}</Heading>
                    <Text>{product.description}</Text>
                    <Text fontSize='2xl'>{product.price}€</Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
}
