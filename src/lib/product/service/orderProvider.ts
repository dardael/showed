import { Customer, Order } from '../models/order';
import { OrderState } from '../models/orderState';

export default interface OrderProvider {
    validateOrder(sessionId: string, customer: Customer): Promise<Order>;
    getOrders(orderState: OrderState): Promise<Order[]>;
    setOrderState(orderId: string, orderState: OrderState): Promise<void>;
}
