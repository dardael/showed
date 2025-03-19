import { ProductModel } from 'showed/lib/product/models/product';
import type { Product } from 'showed/lib/product/models/product';
import type Database from 'showed/lib/core/database/service/database';
import ProductRepositoryInterface from 'showed/lib/product/productRepository';

export default class ProductRepository implements ProductRepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async createProduct(product: Product): Promise<Product> {
        return this.database.create<Product>(ProductModel, product);
    }

    public async updateProduct(product: Product): Promise<void> {
        await this.database.findByIdAndUpdate<Product>(
            ProductModel,
            product._id as string,
            product
        );
    }

    public async deleteProduct(productId: string): Promise<void> {
        await this.database.findByIdAndDelete(ProductModel, productId);
    }
    public async getProducts(): Promise<Product[]> {
        return this.database.find<Product>(ProductModel, {});
    }
    public async getProduct(id: string): Promise<Product> {
        return (
            await this.database.find<Product>(ProductModel, {
                model: { _id: id },
            })
        ).pop() as Product;
    }
}
