import mongoose, { Model } from 'mongoose';
import { Page } from './page';

const PageSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    urlPart: { type: String, required: true },
    position: { type: Number, required: true },
    soundId: { type: String },
    width: { type: Number },
});

let PageModel: Model<Page> = mongoose.models.Page;
if (!PageModel) {
    PageModel = mongoose.model<Page>('Page', PageSchema);
}
export { PageModel };
