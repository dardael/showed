import mongoose, { Model } from 'mongoose';

type Page = {
    _id?: string;
    title: string;
    content: string;
};
const PageSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    title: { type: String, required: true, unique: true },
    content: { type: String },
});

let PageModel: Model<Page> = mongoose.models.Page;
if (!PageModel) {
    PageModel = mongoose.model<Page>('Page', PageSchema);
}

export { PageModel };
export type { Page };
