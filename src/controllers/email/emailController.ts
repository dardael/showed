'use server';
import Provider from 'showed/lib/email/service/provider';
import { getService } from '#src/lib/core/dependencyInjection/getter';
import { EmailKey } from 'showed/lib/email/models/emailKey';
import { Email } from 'showed/lib/email/models/email';
export async function saveSMTPConfig(data: FormData): Promise<void> {
    const host = data.get('host')?.toString();
    const port = data.get('port')?.toString();
    const user = data.get('user')?.toString();
    const password = data.get('password')?.toString();
    const from = data.get('from')?.toString();

    const provider: Provider = getService('Email');
    provider.saveSMTPServerConfiguration(
        host as string,
        Number.parseInt(port as string, 10),
        user as string,
        password as string,
        from as string
    );
}
export async function getSMTPConfig(): Promise<{
    host: string | null;
    port: number;
    user: string | null;
    password: string | null;
    from: string | null;
}> {
    const provider: Provider = getService('Email');
    return provider.getSMTPServerConfiguration();
}

export async function saveEmail(data: FormData): Promise<void> {
    const key = data.get('key')?.toString() as EmailKey;
    const subject = data.get('subject')?.toString() as string;
    const body = data.get('body')?.toString() as string;

    const provider: Provider = getService('Email');
    provider.saveEmailTemplate(key, { subject, body });
}

export async function getEmail(key: EmailKey): Promise<Email | null> {
    const provider: Provider = getService('Email');
    return provider.getEmailTemplate(key);
}
