import { Email } from './models/email';
import { EmailKey } from './models/emailKey';

export default interface Repository {
    saveEmailTemplate(
        key: EmailKey,
        email: { subject: string; body: string }
    ): Promise<void>;

    get(key: EmailKey): Promise<Email | null>;
}
