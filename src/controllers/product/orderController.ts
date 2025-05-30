'use server';
import { getService } from 'showed/lib/core/dependencyInjection/getter';
import { getSessionId } from '../cookies/sessionController';
import { Customer, Order } from 'showed/lib/product/models/order';
import OrderProvider from 'showed/lib/product/service/orderProvider';

export async function validateOrder(customer: Customer): Promise<Order> {
    const sessionId = (await getSessionId(true)) as string;
    const service: OrderProvider = getService('OrderProvider');
    return service.validateOrder(sessionId, customer);
}
