import mongoose, { Model } from 'mongoose';

type Page = {
    _id?: string;
    title: string;
    urlPart: string;
    content: string;
    position: number;
};
const PageSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    title: { type: String, required: true },
    urlPart: { type: String, required: true },
    position: { type: Number, required: true },
    content: { type: String },
});

let PageModel: Model<Page> = mongoose.models.Page;
if (!PageModel) {
    PageModel = mongoose.model<Page>('Page', PageSchema);
}

export { PageModel };
export type { Page };
