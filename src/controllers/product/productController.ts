'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Product } from 'showed/lib/product/models/product';
import ProductProvider from 'showed/lib/product/service/productProvider';
import { Container } from 'typedi';

export async function updateProduct(product: Product): Promise<void> {
    const productService: ProductProvider = Container.get('ProductProvider');
    return productService.updateProduct(product);
}

export async function createProduct(product: Product): Promise<Product> {
    const productService: ProductProvider = Container.get('ProductProvider');
    return productService.createProduct(product);
}

export async function deleteProduct(productId: string): Promise<void> {
    const productService: ProductProvider = Container.get('ProductProvider');
    return productService.deleteProduct(productId);
}

export async function getProducts(): Promise<Product[]> {
    const productService: ProductProvider = Container.get('ProductProvider');
    return productService.getProducts();
}
