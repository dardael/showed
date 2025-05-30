import ShoppingCartProviderInterface from './service/shoppingCartProvider';
import { Product } from './models/product';
import Cache from '../core/cache/service/cache';

export default class ShoppingCartProvider
    implements ShoppingCartProviderInterface
{
    constructor(private cache: Cache) {
        this.cache = cache;
    }

    public async addProductToCache(
        sessionId: string,
        product: Product
    ): Promise<void> {
        const products: Product[] | undefined = await this.cache.get(sessionId);
        if (products) {
            products.push(product);
            this.cache.set(sessionId, products);
        } else {
            this.cache.set(sessionId, [product]);
        }
    }

    public async removeProductFromCache(
        sessionId: string,
        product: Product
    ): Promise<void> {
        const products: Product[] | undefined = await this.cache.get(sessionId);
        if (products) {
            const firstProduct = products.find((p) => p._id === product._id);
            if (firstProduct) {
                products.splice(products.indexOf(firstProduct), 1);
                this.cache.set(sessionId, products);
            }
        }
    }

    public async removeAllProductsFromCache(sessionId: string): Promise<void> {
        this.cache.delete(sessionId);
    }

    public async getProductCount(
        sessionId: string,
        product: Product
    ): Promise<number> {
        const products: Product[] | undefined = await this.cache.get(sessionId);
        if (products) {
            return products.filter((p) => p._id === product._id).length;
        } else {
            return 0;
        }
    }

    public async getProductsFromCache(
        sessionId: string
    ): Promise<{ product: Product; quantity: number }[]> {
        const products: Product[] = (await this.cache.get(sessionId)) || [];
        return products.reduce(
            (acc, product) => {
                const existingProduct = acc.find(
                    (item) => item.product._id === product._id
                );
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    acc.push({ product, quantity: 1 });
                }
                return acc;
            },
            [] as { product: Product; quantity: number }[]
        );
    }
}
