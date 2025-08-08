import EmailProvider from 'showed/lib/email/provider';
import Repository from 'showed/lib/email/repository';
import type Provider from 'showed/lib/configuration/service/provider';
import MaintainerProvider from 'showed/lib/maintainer/provider';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('Provider - sendMail', () => {
    let provider: EmailProvider;
    let sendMailMock: jest.Mock;

    beforeEach(() => {
        provider = new EmailProvider(
            {} as Repository,
            {} as Provider,
            {} as MaintainerProvider
        );
        sendMailMock = jest.fn();
        (nodemailer.createTransport as jest.Mock).mockReturnValue({
            sendMail: sendMailMock,
        });
    });

    it('should replace placeholders in email subject and body correctly', async () => {
        const smtpConfigMock = {
            host: 'smtp.example.com',
            port: 587,
            user: 'user@example.com',
            password: 'password',
            from: 'noreply@example.com',
        };

        jest.spyOn(provider, 'getSMTPServerConfiguration').mockResolvedValue(
            smtpConfigMock
        );

        const to = 'recipient@example.com';
        const subject = 'Today is {ajd}';
        const text = 'The current time is {maintenant}.';

        const dateMock = new Date('2025-08-08T14:00:00');
        jest.spyOn(global, 'Date').mockImplementation(
            () => dateMock as unknown as Date
        );
        jest.spyOn(dateMock, 'toLocaleDateString').mockReturnValue(
            '08/08/2025'
        );
        jest.spyOn(dateMock, 'toLocaleTimeString').mockReturnValue('14:00:00');

        await provider['sendMail'](to, subject, text);

        expect(sendMailMock).toHaveBeenCalledWith({
            from: 'noreply@example.com',
            to,
            subject: 'Today is 08/08/2025',
            text: 'The current time is 14:00:00.',
        });
    });
});
