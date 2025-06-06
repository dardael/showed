import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
    getOrders,
    setOrderState,
} from 'showed/controllers/product/orderController';
import { Order } from 'showed/lib/product/models/order';
import { OrderState } from 'showed/lib/product/models/orderState';
import { Notification } from 'showed/components/core/feedback/notification';
import Loading from 'showed/components/core/feedback/loading';
import AggregatedProducts from './aggregatedProducts';

export default function NewOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const notification = new Notification(useToast());
    useEffect(() => {
        getOrders(OrderState.NEW).then((fetchedOrders) => {
            setOrders(fetchedOrders);
            setIsLoading(false);
        });
    }, []);

    const cancelOrder = async (order: Order) => {
        const pendingRequest = setOrderState(
            order._id as string,
            OrderState.CANCELLED
        );
        notification.handlePromise(pendingRequest, {
            loading: 'Annulation de la commande en cours',
            success: 'La commande a été annulée avec succès',
            error: "Erreur lors de l'annulation de la commande",
        });
        await pendingRequest;
        setOrders(orders.filter((o) => o._id !== order._id));
    };

    const validateOrder = async (order: Order) => {
        const pendingRequest = setOrderState(
            order._id as string,
            OrderState.VALIDATED
        );
        notification.handlePromise(pendingRequest, {
            loading: 'Validation de la commande en cours',
            success: 'La commande a été validée avec succès',
            error: 'Erreur lors de la validation de la commande',
        });
        await pendingRequest;
        setOrders(orders.filter((o) => o._id !== order._id));
    };

    return (
        <Loading isLoading={isLoading}>
            <TableContainer>
                <Table variant='striped' size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Client</Th>
                            <Th>Téléphone</Th>
                            <Th>Email</Th>
                            <Th>Produits</Th>
                            <Th>Prix total</Th>
                            <Th>Date de création</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order._id}>
                                <Td>
                                    {order.customer.name}{' '}
                                    {order.customer.surname}
                                </Td>
                                <Td>
                                    {order.customer.phoneNumber ||
                                        'Non renseigné'}
                                </Td>
                                <Td>
                                    {order.customer.email || 'Non renseigné'}
                                </Td>
                                <Td>
                                    {order.products.map((p) => (
                                        <div key={p.product._id}>
                                            {p.product.name} (x{p.quantity})
                                        </div>
                                    ))}
                                </Td>
                                <Td>
                                    {order.products
                                        .reduce(
                                            (total, p) =>
                                                total +
                                                p.product.price * p.quantity,
                                            0
                                        )
                                        .toFixed(2)}{' '}
                                    €
                                </Td>
                                <Td>
                                    {new Date(
                                        order.createdAt as Date
                                    ).toLocaleString()}
                                </Td>
                                <Td>
                                    <Button
                                        onClick={() => validateOrder(order)}
                                    >
                                        Valider
                                    </Button>
                                    <Button
                                        marginLeft={2}
                                        variant='outline'
                                        onClick={() => cancelOrder(order)}
                                    >
                                        Annuler
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                        {orders.length === 0 && (
                            <Tr>
                                <Td colSpan={7} textAlign='center'>
                                    {orders.length === 0
                                        ? 'Aucune nouvelle commande'
                                        : ''}
                                </Td>
                            </Tr>
                        )}
                        {orders.length > 0 && (
                            <Tr>
                                <Td colSpan={3} textAlign='center'>
                                    <Text fontSize='l' as='b'>
                                        Total
                                    </Text>
                                </Td>
                                <Td>
                                    <AggregatedProducts orders={orders} />
                                </Td>
                                <Td>
                                    {orders
                                        .reduce(
                                            (total, order) =>
                                                total +
                                                order.products.reduce(
                                                    (orderTotal, p) =>
                                                        orderTotal +
                                                        p.product.price *
                                                            p.quantity,
                                                    0
                                                ),
                                            0
                                        )
                                        .toFixed(2)}{' '}
                                    €
                                </Td>
                                <Td colSpan={2} />
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Loading>
    );
}
