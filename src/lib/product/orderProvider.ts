import OrderRepository from './orderRepository';
import OrderProviderInterface from './service/orderProvider';
import { Customer, Order, Product } from './models/order';
import ShoppingCartProvider from './service/shoppingCartProvider';
import EmailProviderInterface from '../email/service/provider';
import MaintainerProviderInterface from '../maintainer/service/provider';
import { OrderState } from './models/orderState';

export default class OrderProvider implements OrderProviderInterface {
    constructor(
        private repository: OrderRepository,
        private shoppingCartProvider: ShoppingCartProvider,
        private emailProvider: EmailProviderInterface,
        private maintainerProvider: MaintainerProviderInterface
    ) {
        this.repository = repository;
        this.shoppingCartProvider = shoppingCartProvider;
        this.emailProvider = emailProvider;
        this.maintainerProvider = maintainerProvider;
    }

    public async validateOrder(
        sessionId: string,
        customer: Customer
    ): Promise<Order> {
        const shoppingCart =
            await this.shoppingCartProvider.getProductsFromCache(sessionId);
        const order: Order = {
            customer,
            products: shoppingCart.map((product) => ({
                quantity: product.quantity,
                product: {
                    _id: product.product._id,
                    name: product.product.name,
                    price: product.product.price,
                    description: product.product.description,
                } as Product,
            })),
            state: OrderState.NEW,
        };
        this.shoppingCartProvider.removeAllProductsFromCache(sessionId);
        const validatedOrder = await this.repository.validateOrder(order);
        await this.emailProvider.sendMail(
            (await this.maintainerProvider.getMaintainer())?.email as string,
            'Nouvelle commande',
            `Nouvelle commande de ${customer.name} (${customer.email}) avec ${shoppingCart.length} produits.`
        );
        await this.emailProvider.sendMail(
            customer.email,
            'Confirmation de commande',
            'Votre commande a été validée avec succès. Nous vous contacterons bientôt pour le traitement de votre commande.'
        );
        return validatedOrder;
    }
    public async getOrders(orderState: OrderState): Promise<Order[]> {
        return this.repository.getOrders(orderState);
    }
    public async setOrderState(
        orderId: string,
        orderState: OrderState
    ): Promise<void> {
        return this.repository.setOrderState(orderId, orderState);
    }
}
