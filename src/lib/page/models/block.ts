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
    isVisibleOnlyWhenInvitedToReception?: boolean;
    isVisibleOnlyWhenInvitedToMeal?: boolean;
    isVisibleOnlyWhenInvitedToTownHall?: boolean;
};
const BlockSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    pageId: { type: String },
    parentBlockId: { type: String },
    position: { type: Number, required: true },
    hasTransparentBackground: { type: Boolean, required: true },
    title: { type: String, required: true },
    backgroundImageId: { type: String },
    blockType: { type: String },
    isVisibleOnlyWhenInvitedToReception: { type: Boolean },
    isVisibleOnlyWhenInvitedToMeal: { type: Boolean },
    isVisibleOnlyWhenInvitedToTownHall: { type: Boolean },
});

let BlockModel: Model<Block> = mongoose?.models?.Block;
if (!BlockModel) {
    BlockModel = mongoose.model<Block>('Block', BlockSchema);
}

function isBlock(object: unknown): object is Block {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    return (
        ('parentBlockId' in object || 'pageId' in object) &&
        'position' in object &&
        'hasTransparentBackground' in object &&
        'title' in object
    );
}

export { BlockModel, isBlock };
export type { Block };
