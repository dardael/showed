import mongoose, { Model } from 'mongoose';
import { SocialNetworkName } from './socialNetworkName';

type SocialNetwork = {
    _id?: string;
    name: SocialNetworkName;
    text?: string;
    link?: string;
};
const SocialNetworkSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    text: { type: String },
    link: { type: String },
});
let SocialNetworkModel: Model<SocialNetwork> = mongoose.models.SocialNetwork;
if (!SocialNetworkModel) {
    SocialNetworkModel = mongoose.model<SocialNetwork>(
        'SocialNetwork',
        SocialNetworkSchema
    );
}

export { SocialNetworkModel };
export type { SocialNetwork };
