import mongoose, { Schema, Model } from 'mongoose';

export interface Customer {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
}

export interface Order {
    _id: string;
    customer: Customer;
    products: { product: Product; quantity: number }[];
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

const ProductSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
});

const OrderSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        customer: { type: CustomerSchema, required: true },
        products: [
            {
                product: { type: ProductSchema, required: true },
                quantity: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);
let OrderModel: Model<Order> = mongoose?.models?.Order;
if (!OrderModel) {
    OrderModel = mongoose.model<Order>('Order', OrderSchema);
}

export { OrderModel };
