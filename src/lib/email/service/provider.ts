import { Order } from 'showed/lib/product/models/order';
import { Email } from '../models/email';
import { EmailKey } from '../models/emailKey';

export default interface Provider {
    sendNewOrderEmail(order: Order): Promise<void>;
    sendOrderConfirmationEmail(order: Order): Promise<void>;
    saveSMTPServerConfiguration(
        host: string,
        port: number,
        user: string,
        password: string,
        from: string
    ): Promise<void>;
    getSMTPServerConfiguration(): Promise<{
        host: string | null;
        port: number;
        user: string | null;
        password: string | null;
        from: string | null;
    }>;
    saveEmailTemplate(
        key: EmailKey,
        email: {
            subject: string;
            body: string;
        }
    ): Promise<void>;
    getEmailTemplate(key: EmailKey): Promise<Email | null>;
}
