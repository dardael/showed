import mongoose, { Model } from 'mongoose';

type Block = {
    _id?: string;
    pageId?: string;
    backgroundImageId?: string;
    title: string;
    position: number;
    parentBlockId?: string;
    hasTransparentBackground: boolean;
    blockType?: string;
};
const BlockSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    pageId: { type: String },
    parentBlockId: { type: String },
    position: { type: Number, required: true },
    hasTransparentBackground: { type: Boolean, required: true },
    title: { type: String, required: true },
    backgroundImageId: { type: String },
    blockType: { type: String },
});

let BlockModel: Model<Block> = mongoose?.models?.Block;
if (!BlockModel) {
    BlockModel = mongoose.model<Block>('Block', BlockSchema);
}

function isBlock(object: any): object is Block {
    return (
        (object.hasOwnProperty('parentBlockId') ||
            object.hasOwnProperty('pageId')) &&
        object.hasOwnProperty('position') &&
        object.hasOwnProperty('hasTransparentBackground') &&
        object.hasOwnProperty('title')
    );
}

export { BlockModel, isBlock };
export type { Block };
