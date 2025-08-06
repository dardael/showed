import mongoose, { Model } from 'mongoose';
import { Color } from './color';
import { WebsiteMode } from './websiteMode';

type Theme = {
    _id?: string;
    logoImageId?: string;
    color: Color;
    websiteMode: WebsiteMode;
    title?: string;
    description?: string;
    isMenuHidden?: boolean;
};
const ThemeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    logoImageId: { type: String },
    color: { type: String, required: true },
    websiteMode: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    isMenuHidden: { type: Boolean },
});

let ThemeModel: Model<Theme> = mongoose.models.Theme;
if (!ThemeModel) {
    ThemeModel = mongoose.model<Theme>('Theme', ThemeSchema);
}

export { ThemeModel };
export type { Theme };
