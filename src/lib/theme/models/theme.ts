import mongoose, { Model } from 'mongoose';
import { Color } from './color';

type Theme = {
    _id?: string;
    color: Color;
    title?: string;
    description?: string;
};
const ThemeSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    color: { type: String, required: true },
    title: { type: String },
    description: { type: String },
});

let ThemeModel: Model<Theme> = mongoose.models.Theme;
if (!ThemeModel) {
    ThemeModel = mongoose.model<Theme>('Theme', ThemeSchema);
}

export { ThemeModel };
export type { Theme };
