import mongoose, { Model } from 'mongoose';

type Maintainer = {
    _id?: string;
    email: string;
    name?: string;
    surname?: string;
    password: string;
};
const MaintainerSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    surname: { type: String },
    password: { type: String },
});

let MaintainerModel: Model<Maintainer> = mongoose.models.Maintainer;
if (!MaintainerModel) {
    MaintainerModel = mongoose.model<Maintainer>(
        'Maintainer',
        MaintainerSchema
    );
}

export { MaintainerModel };
export type { Maintainer };
