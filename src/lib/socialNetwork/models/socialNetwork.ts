import mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { SocialNetworkName } from './socialNetworkName';

const SocialNetworkSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    surname: { type: String },
});

SocialNetworkSchema.pre('save', function (next) {
    if (this) {
        this.id = this._id.toString();
        this._id = this.id;
    }
    next();
});

SocialNetworkSchema.post(/^find/, async function (docs: SocialNetworkClass[]) {
    docs.forEach((doc) => {
        doc.id = doc._id.toString();
        doc._id = doc.id;
    });
});

SocialNetworkSchema.index({ email: 1 });

class SocialNetworkClass {
    _id: mongoose.Schema.Types.ObjectId | string;
    id: string;
    link: string;
    name: SocialNetworkName;
    text: string;
}

const SocialNetworkModel = getModelForClass(SocialNetworkClass, {
    schemaOptions: { timestamps: true, collection: 'socialNetworks' },
    options: { allowMixed: 0 }, // Setting Severity.ALLOW to 0
});

const SocialNetwork = SocialNetworkModel;

export { SocialNetwork, SocialNetworkClass };
