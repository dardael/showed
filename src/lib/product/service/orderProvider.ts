import { Customer, Order } from '../models/order';

export default interface OrderProvider {
    validateOrder(sessionId: string, customer: Customer): Promise<Order>;
}
