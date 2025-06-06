'use server';
import { getService } from 'showed/lib/core/dependencyInjection/getter';
import { getSessionId } from '../cookies/sessionController';
import { Customer, Order } from 'showed/lib/product/models/order';
import OrderProvider from 'showed/lib/product/service/orderProvider';
import { OrderState } from 'showed/lib/product/models/orderState';

export async function validateOrder(customer: Customer): Promise<Order> {
    const sessionId = (await getSessionId(true)) as string;
    const service: OrderProvider = getService('OrderProvider');
    return service.validateOrder(sessionId, customer);
}

export async function getOrders(orderState: OrderState): Promise<Order[]> {
    const service: OrderProvider = getService('OrderProvider');
    return service.getOrders(orderState);
}

export async function setOrderState(
    orderId: string,
    orderState: OrderState
): Promise<void> {
    const service: OrderProvider = getService('OrderProvider');
    return service.setOrderState(orderId, orderState);
}
