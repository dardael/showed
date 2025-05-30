import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { Product } from 'showed/lib/product/models/product';

export default function ShoppingCartSummary({
    products,
}: {
    products: { product: Product; quantity: number }[];
}) {
    return (
        <>
            <TableContainer padding={'40px'}>
                <Table variant='striped'>
                    <TableCaption>Récapitulatif de la commande</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Produit</Th>
                            <Th>Quantité</Th>
                            <Th>Prix (€)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map((product) => (
                            <Tr key={product.product._id}>
                                <Td>{product.product.name}</Td>
                                <Td>{product.quantity}</Td>
                                <Td>
                                    {(product.product.price as number) *
                                        product.quantity}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Total</Th>
                            <Th></Th>
                            <Th>
                                {products.reduce(
                                    (acc, product) =>
                                        acc +
                                        (product.product.price as number) *
                                            product.quantity,
                                    0
                                )}
                            </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    );
}
