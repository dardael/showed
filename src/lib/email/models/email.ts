import mongoose, { Model } from 'mongoose';
import { EmailKey } from './emailKey';
type Email = {
    _id?: string;
    key: EmailKey;
    subject: string;
    body: string;
    createdAt?: Date;
    updatedAt?: Date;
};
const EmailSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        key: { type: String },
        subject: { type: String, required: true },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

let EmailModel: Model<Email> = mongoose.models.Email;
if (!EmailModel) {
    EmailModel = mongoose.model<Email>('Email', EmailSchema);
}

export { EmailModel };
export type { Email };
