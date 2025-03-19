import { Product } from './models/product';

export default interface ProductRepository {
    updateProduct(product: Product): Promise<void>;
    createProduct(product: Product): Promise<Product>;
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    deleteProduct(productId: string): Promise<void>;
}
