import mongoose, { Model } from 'mongoose';
import { ConfigurationKey } from './configurationKey';
type Configuration = {
    _id?: string;
    key: ConfigurationKey;
    value: string;
    createdAt?: Date;
    updatedAt?: Date;
};
const ConfigurationSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        key: { type: String },
        value: { type: String },
    },
    { timestamps: true }
);

let ConfigurationModel: Model<Configuration> = mongoose.models.Configuration;
if (!ConfigurationModel) {
    ConfigurationModel = mongoose.model<Configuration>(
        'Configuration',
        ConfigurationSchema
    );
}

export { ConfigurationModel };
export type { Configuration };
