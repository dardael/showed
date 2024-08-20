import mongoose, { Model } from 'mongoose';
import { ComponentType } from './componentType';

type Component = {
    _id?: string;
    pageId: string;
    componentType: ComponentType;
    content: string;
    title: string;
    position: number;
};
const ComponentSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    pageId: { type: String, required: true },
    componentType: { type: String, required: true },
    position: { type: Number, required: true },
    title: { type: String },
    content: { type: String },
});

let ComponentModel: Model<Component> = mongoose.models.Component;
if (!ComponentModel) {
    ComponentModel = mongoose.model<Component>('Component', ComponentSchema);
}

export { ComponentModel };
export type { Component };
