import mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';

const MaintainerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    surname: { type: String },
});

MaintainerSchema.pre('save', function (next) {
    if (this) {
        this.id = this._id.toString();
        this._id = this.id;
    }
    next();
});

MaintainerSchema.post(/^find/, async function (docs: MaintainerClass[]) {
    docs.forEach((doc) => {
        doc.id = doc._id.toString();
        doc._id = doc.id;
    });
});

MaintainerSchema.index({ email: 1 });

class MaintainerClass {
    _id: mongoose.Schema.Types.ObjectId | string;
    id: string;
    email: string;
    name: string;
    surname: string;
}

const MaintainerModel = getModelForClass(MaintainerClass, {
    schemaOptions: { timestamps: true, collection: 'maintainers' },
    options: { allowMixed: 0 }, // Setting Severity.ALLOW to 0
});

const Maintainer = MaintainerModel;

export { Maintainer, MaintainerClass };
