import { Order } from './models/order';

export default interface OrderRepository {
    validateOrder(order: Order): Promise<Order>;
}
