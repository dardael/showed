import { Product } from '../models/product';

export default interface ShoppingCartProvider {
    addProductToCache(sessionId: string, product: Product): Promise<void>;
    removeProductFromCache(sessionId: string, product: Product): Promise<void>;
    getProductCount(sessionId: string, product: Product): Promise<number>;
}
