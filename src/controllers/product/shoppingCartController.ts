'use server';
import { getService } from 'showed/lib/core/dependencyInjection/getter';
import { Product } from 'showed/lib/product/models/product';
import { getSessionId } from '../cookies/sessionController';
import ShoppingCartProvider from 'showed/lib/product/service/shoppingCartProvider';

export async function addProductToCache(product: Product): Promise<void> {
    const sessionId = (await getSessionId(true)) as string;
    const service: ShoppingCartProvider = getService('ShoppingCartProvider');
    service.addProductToCache(sessionId, product);
}

export async function removeProductFromCache(product: Product): Promise<void> {
    const sessionId = (await getSessionId(true)) as string;
    const service: ShoppingCartProvider = getService('ShoppingCartProvider');
    service.removeProductFromCache(sessionId, product);
}

export async function getProductCount(product: Product): Promise<number> {
    const sessionId = (await getSessionId(true)) as string;
    const service: ShoppingCartProvider = getService('ShoppingCartProvider');
    return service.getProductCount(sessionId, product);
}

export async function getProductsFromCache(): Promise<
    { product: Product; quantity: number }[]
> {
    const sessionId = (await getSessionId(true)) as string;
    const service: ShoppingCartProvider = getService('ShoppingCartProvider');
    return service.getProductsFromCache(sessionId);
}
