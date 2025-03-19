import { Product } from '../models/product';

export default interface ProductProvider {
    createProduct(product: Product): Promise<Product>;
    deleteProduct(productId: string): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    getProducts(): Promise<Product[]>;
}
