import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    post,
    prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { SocialNetworkName } from './socialNetworkName';

@post<SocialNetworkClass>('save', function (doc) {
    if (doc) {
        doc.id = doc._id.toString();
        doc._id = doc.id;
    }
})
@post<SocialNetworkClass[]>(/^find/, function (docs) {
    // @ts-ignore
    if (this.op === 'find') {
        docs.forEach((doc) => {
            doc.id = doc._id.toString();
            doc._id = doc.id;
        });
    }
})
@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: 'socialNetworks',
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ name: 1 })
class SocialNetworkClass {
    @prop({
        required: true,
        unique: true,
        set: (name: SocialNetworkName) => name.toString(),
        get: (name: string) => SocialNetworkName.getSocialNetworkName(name),
    })
    name: string;

    @prop()
    text: string;

    @prop()
    link: string;

    _id: mongoose.Types.ObjectId | string;

    id: string;
}

const SocialNetwork = getModelForClass(SocialNetworkClass);
export { SocialNetwork, SocialNetworkClass };
