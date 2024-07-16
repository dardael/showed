import mongoose, { Model } from 'mongoose';
import { Color } from './color';

type Theme = {
    _id?: string;
    color: Color;
};
const ThemeSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    color: { type: String, required: true },
});

let ThemeModel: Model<Theme> = mongoose.models.Theme;
if (!ThemeModel) {
    ThemeModel = mongoose.model<Theme>('Theme', ThemeSchema);
}

export { ThemeModel };
export type { Theme };
