import mongoose, { Model } from 'mongoose';
import { Block } from './block';
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

export { BlockModel };
