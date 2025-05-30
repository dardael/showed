import { OrderModel } from 'showed/lib/product/models/order';
import type { Order } from 'showed/lib/product/models/order';
import type Database from 'showed/lib/core/database/service/database';
import OrderRepositoryInterface from 'showed/lib/product/orderRepository';

export default class OrderRepository implements OrderRepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }
    public async validateOrder(order: Order): Promise<Order> {
        return this.database.create<Order>(OrderModel, order);
    }
}
