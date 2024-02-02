import {
    ModelOptions,
    Severity,
    getModelForClass,
    index,
    post,
    prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@post<MaintainerClass>('save', function (doc) {
    if (doc) {
        doc.id = doc._id.toString();
        doc._id = doc.id;
    }
})
@post<MaintainerClass[]>(/^find/, function (docs) {
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
        collection: 'maintainers',
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ email: 1 })
class MaintainerClass {
    @prop({ required: true, unique: true })
    email: string;

    @prop()
    name: string;

    @prop()
    surname: string;

    _id: mongoose.Types.ObjectId | string;

    id: string;
}

const Maintainer = getModelForClass(MaintainerClass);
export { Maintainer, MaintainerClass };
