import { OrderModel } from 'showed/lib/product/models/order';
import type { Order } from 'showed/lib/product/models/order';
import type Database from 'showed/lib/core/database/service/database';
import OrderRepositoryInterface from 'showed/lib/product/orderRepository';
import { OrderState } from '../../models/orderState';

export default class OrderRepository implements OrderRepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }
    public async validateOrder(order: Order): Promise<Order> {
        order.customer._id = this.database.getNewId();
        return this.database.create<Order>(OrderModel, order);
    }
    public async setOrderState(
        orderId: OrderState,
        orderState: OrderState
    ): Promise<void> {
        await this.database.findByIdAndUpdate(OrderModel, orderId, {
            state: orderState,
        });
    }
    public async getOrders(orderState: OrderState): Promise<Order[]> {
        return this.database.find<Order>(OrderModel, {
            model: { state: orderState },
        });
    }
}
