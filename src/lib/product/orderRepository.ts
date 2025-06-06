import { Order } from './models/order';
import { OrderState } from './models/orderState';

export default interface OrderRepository {
    validateOrder(order: Order): Promise<Order>;
    setOrderState(orderId: string, orderState: OrderState): Promise<void>;
    getOrders(orderState: OrderState): Promise<Order[]>;
}
