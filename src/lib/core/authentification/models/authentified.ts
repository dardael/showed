import mongoose, { Model } from 'mongoose';

type Authentified = {
    _id?: string;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
};
const AuthentifiedSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        token: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

let AuthentifiedModel: Model<Authentified> = mongoose.models.Authentified;
if (!AuthentifiedModel) {
    AuthentifiedModel = mongoose.model<Authentified>(
        'Authentified',
        AuthentifiedSchema
    );
}

export { AuthentifiedModel };
export type { Authentified };
