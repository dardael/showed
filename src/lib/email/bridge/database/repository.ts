import { EmailModel } from 'showed/lib/email/models/email';
import type { Email } from 'showed/lib/email/models/email';
import RepositoryInterface from 'showed/lib/email/repository';
import type Database from 'showed/lib/core/database/service/database';
import { EmailKey } from '../../models/emailKey';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async get(key: EmailKey): Promise<Email | null> {
        const emails = await this.database.find<Email>(EmailModel, {
            model: { key },
        });
        return emails.length > 0 ? emails[0] : null;
    }

    public async saveEmailTemplate(
        key: EmailKey,
        email: { subject: string; body: string }
    ): Promise<void> {
        const existingEmail = await this.database.find<Email>(EmailModel, {
            model: { key },
        });
        if (existingEmail.length > 0) {
            await this.database.findByIdAndUpdate<Email>(
                EmailModel,
                existingEmail[0]._id as string,
                { subject: email.subject, body: email.body }
            );
            return;
        }
        await this.database.create<Email>(EmailModel, {
            key,
            subject: email.subject,
            body: email.body,
        });
        return;
    }
}
