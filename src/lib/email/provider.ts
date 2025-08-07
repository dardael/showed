import ProviderInterface from 'showed/lib/email/service/provider';
import nodemailer from 'nodemailer';

export default class Provider implements ProviderInterface {
    public async sendMail(
        to: string,
        subject: string,
        text: string
    ): Promise<void> {
        if (
            !to ||
            !process.env.SMTP_HOST ||
            !process.env.SMTP_PORT ||
            !process.env.SMTP_USER ||
            !process.env.SMTP_PASS
        ) {
            return;
        }
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT as string, 10),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text,
        });
    }
}
