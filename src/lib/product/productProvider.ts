import ProductRepository from './productRepository';
import ProductProviderInterface from './service/productProvider';
import { Product } from './models/product';
import FileProvider from 'showed/lib/file/service/provider';

export default class ProductProvider implements ProductProviderInterface {
    constructor(
        private repository: ProductRepository,
        private fileProvider: FileProvider
    ) {
        this.repository = repository;
        this.fileProvider = fileProvider;
    }

    public async updateProduct(product: Product): Promise<void> {
        return this.repository.updateProduct(product);
    }

    public async createProduct(product: Product): Promise<Product> {
        return this.repository.createProduct(product);
    }

    public async deleteProduct(productId: string): Promise<void> {
        const product = await this.repository.getProduct(productId);
        await this.fileProvider.deleteFile(product.imageId);
        return this.repository.deleteProduct(productId);
    }

    public async getProducts(): Promise<Product[]> {
        return this.repository.getProducts();
    }
}
