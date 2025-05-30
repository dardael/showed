import { Product } from '../models/product';

export default interface ShoppingCartProvider {
    addProductToCache(sessionId: string, product: Product): Promise<void>;
    removeProductFromCache(sessionId: string, product: Product): Promise<void>;
    removeAllProductsFromCache(sessionId: string): Promise<void>;
    getProductCount(sessionId: string, product: Product): Promise<number>;
    getProductsFromCache(
        sessionId: string
    ): Promise<{ product: Product; quantity: number }[]>;
}
