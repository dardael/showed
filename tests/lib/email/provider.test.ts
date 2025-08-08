import EmailProvider from 'showed/lib/email/provider';
import { Order } from 'showed/lib/product/models/order';
import { OrderState } from 'showed/lib/product/models/orderState';

describe('Provider - replacePlaceholders with Order object', () => {
    let provider: EmailProvider;

    beforeEach(() => {
        provider = new EmailProvider(
            {} as import('showed/lib/email/repository').default, // Mock repository
            {} as import('showed/lib/configuration/service/provider').default, // Mock configuration
            {} as import('showed/lib/maintainer/provider').default // Mock maintainerProvider
        );
    });

    it('should replace {ajd} and {maintenant} placeholders correctly', () => {
        const content = 'Today: {ajd}, Now: {maintenant}';
        const result = (provider as EmailProvider).replacePlaceholders(
            content,
            {
                ajd: new Date().toLocaleDateString(),
                maintenant: new Date().toLocaleTimeString(),
            }
        );

        expect(result).toContain('Today: ');
        expect(result).toContain('Now: ');
    });

    it('should replace customer properties placeholders correctly', () => {
        const order: Order = {
            customer: {
                name: 'John Doe',
                surname: 'Smith',
                email: 'john.doe@example.com',
                phoneNumber: '123-456-7890',
            },
            products: [],
            state: OrderState.NEW,
        } as Order;

        const content =
            'Customer: {client.nom} {client.prenom}, Email: {client.email}, Phone: {client.telephone}';
        const result = (provider as EmailProvider).replacePlaceholders(
            content,
            {},
            order
        );

        expect(result).toBe(
            'Customer: John Doe Smith, Email: john.doe@example.com, Phone: 123-456-7890'
        );
    });

    it('should replace total price placeholder correctly', () => {
        const order: Order = {
            customer: {
                name: 'John Doe',
                surname: 'Smith',
                email: 'john.doe@example.com',
                phoneNumber: '123-456-7890',
            },
            products: [
                {
                    product: { _id: '1', name: 'Product A', price: 10 },
                    quantity: 2,
                },
                {
                    product: { _id: '2', name: 'Product B', price: 25 },
                    quantity: 1,
                },
            ],
            state: OrderState.NEW,
        };

        const content = 'Total Price: {prix-total}';
        const result = (provider as EmailProvider).replacePlaceholders(
            content,
            {},
            order
        );

        expect(result).toBe('Total Price: 45.00');
    });

    it('should replace product summary placeholder correctly', () => {
        const order: Order = {
            customer: {
                name: 'John Doe',
                surname: 'Smith',
                email: 'john.doe@example.com',
                phoneNumber: '123-456-7890',
            },
            products: [
                {
                    product: { _id: '1', name: 'Product A', price: 10 },
                    quantity: 2,
                },
                {
                    product: { _id: '2', name: 'Product B', price: 25 },
                    quantity: 1,
                },
            ],
            state: OrderState.NEW,
        };

        const content = 'Product Summary:\n{recap-produits}';
        const result = (provider as EmailProvider).replacePlaceholders(
            content,
            {},
            order
        );

        expect(result).toBe(
            'Product Summary:\nProduct A x 2 = 20.00\nProduct B x 1 = 25.00'
        );
    });
});
