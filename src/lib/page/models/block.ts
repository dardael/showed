import mongoose, { Model } from 'mongoose';

type Block = {
    _id?: string;
    pageId?: string;
    backgroundImageId: string;
    title: string;
    position: number;
    parentBlockId?: number;
    hasTransparentBackground: boolean;
};
const BlockSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    pageId: { type: String },
    parentBlockId: { type: Number },
    position: { type: Number, required: true },
    hasTransparentBackground: { type: Boolean, required: true },
    title: { type: String },
    backgroundImageId: { type: String },
});

let BlockModel: Model<Block> = mongoose.models.Block;
if (!BlockModel) {
    BlockModel = mongoose.model<Block>('Block', BlockSchema);
}

export { BlockModel };
export type { Block };
