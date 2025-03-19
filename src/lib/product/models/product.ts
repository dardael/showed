import mongoose, { Model } from 'mongoose';
type Product = {
    _id?: string;
    name: string;
    description: string;
    price?: number;
    imageId: string;
};
const ProductSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String },
    imageId: { type: String, required: true },
});

let ProductModel: Model<Product> = mongoose?.models?.Product;
if (!ProductModel) {
    ProductModel = mongoose.model<Product>('Product', ProductSchema);
}

export { ProductModel };
export type { Product };
