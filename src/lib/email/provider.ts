import ProviderInterface from 'showed/lib/email/service/provider';
import Configuration from 'showed/lib/configuration/service/provider';
import nodemailer from 'nodemailer';
import { ConfigurationKey } from '../configuration/models/configurationKey';
import { EmailKey } from './models/emailKey';
import Repository from 'showed/lib/email/repository';
import { Email } from './models/email';
import MaintainerProvider from 'showed/lib/maintainer/service/provider';
import { Order } from '../product/models/order';

export default class Provider implements ProviderInterface {
    constructor(
        private repository: Repository,
        private configuration: Configuration,
        private maintainerProvider: MaintainerProvider
    ) {
        this.configuration = configuration;
        this.repository = repository;
        this.maintainerProvider = maintainerProvider;
    }
    public replacePlaceholders(
        content: string,
        placeholders: { [key: string]: string },
        order?: Order
    ): string {
        if (order) {
            placeholders['client.nom'] = order.customer.name;
            placeholders['client.prenom'] = order.customer.surname;
            placeholders['client.email'] = order.customer.email;
            placeholders['client.telephone'] = order.customer.phoneNumber;

            const totalPrice = order.products.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );
            placeholders['prix-total'] = totalPrice.toFixed(2);

            const productSummary = order.products
                .map(
                    (item) =>
                        `${item.product.name} x ${item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}`
                )
                .join('\n');
            placeholders['recap-produits'] = productSummary;
        }

        return content.replace(
            /\{(.*?)\}/g,
            (_, key) => placeholders[key] || `{${key}}`
        );
    }

    private async sendMail(
        to: string,
        subject: string,
        text: string
    ): Promise<void> {
        const smtpConfig = await this.getSMTPServerConfiguration();
        if (
            !to ||
            !smtpConfig.host ||
            !smtpConfig.port ||
            !smtpConfig.user ||
            !smtpConfig.password ||
            !smtpConfig.from
        ) {
            return;
        }
        const placeholders = {
            ajd: new Date().toLocaleDateString(),
            maintenant: new Date().toLocaleTimeString(),
        };
        subject = this.replacePlaceholders(subject, placeholders);
        text = this.replacePlaceholders(text, placeholders);

        const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port: smtpConfig.port,
            auth: {
                user: smtpConfig.user,
                pass: smtpConfig.password,
            },
        });
        await transporter.sendMail({
            from: smtpConfig.from,
            to,
            subject,
            text,
        });
    }

    public async sendNewOrderEmail(order: Order): Promise<void> {
        const emailTemplate = await this.getEmailTemplate(
            EmailKey.NEW_ORDER_CREATED
        );
        const placeholders: { [key: string]: string } = {};
        const subject = this.replacePlaceholders(
            emailTemplate?.subject || '',
            placeholders,
            order
        );
        const body = this.replacePlaceholders(
            emailTemplate?.body || '',
            placeholders,
            order
        );
        await this.sendMail(
            (await this.maintainerProvider.getMaintainer())?.email || '',
            subject,
            body
        );
    }
    public async sendOrderConfirmationEmail(order: Order): Promise<void> {
        const emailTemplate = await this.getEmailTemplate(
            EmailKey.ORDER_CONFIRMATION
        );
        const placeholders: { [key: string]: string } = {};
        const subject = this.replacePlaceholders(
            emailTemplate?.subject || '',
            placeholders,
            order
        );
        const body = this.replacePlaceholders(
            emailTemplate?.body || '',
            placeholders,
            order
        );
        await this.sendMail(order.customer.email, subject, body);
    }

    public async saveSMTPServerConfiguration(
        host: string,
        port: number,
        user: string,
        password: string,
        from: string
    ): Promise<void> {
        await this.configuration.set(ConfigurationKey.SMTP_HOST, host);
        await this.configuration.set(
            ConfigurationKey.SMTP_PORT,
            port.toString()
        );
        await this.configuration.set(ConfigurationKey.SMTP_USER, user);
        await this.configuration.set(ConfigurationKey.SMTP_PASS, password);
        await this.configuration.set(ConfigurationKey.SMTP_FROM, from);
    }

    public async getSMTPServerConfiguration(): Promise<{
        host: string | null;
        port: number;
        user: string | null;
        password: string | null;
        from: string | null;
    }> {
        return {
            host: await this.configuration.get(ConfigurationKey.SMTP_HOST),
            port: parseInt(
                (await this.configuration.get(ConfigurationKey.SMTP_PORT)) ||
                    '0',
                10
            ),
            user: await this.configuration.get(ConfigurationKey.SMTP_USER),
            password: await this.configuration.get(ConfigurationKey.SMTP_PASS),
            from: await this.configuration.get(ConfigurationKey.SMTP_FROM),
        };
    }
    public async saveEmailTemplate(
        key: EmailKey,
        email: {
            subject: string;
            body: string;
        }
    ): Promise<void> {
        this.repository.saveEmailTemplate(key, email);
    }
    public async getEmailTemplate(key: EmailKey): Promise<Email | null> {
        return this.repository.get(key);
    }
}
