import mongoose, { Model } from 'mongoose';
import { ComponentType } from './componentType';
import { Font } from 'showed/lib/theme/models/font';

type Component = {
    _id?: string;
    blockId: string;
    componentType: ComponentType;
    content: string;
    title: string;
    position: number;
    link?: string;
    width?: number;
    font?: Font;
};
const ComponentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    blockId: { type: String, required: true },
    componentType: { type: String, required: true },
    position: { type: Number, required: true },
    width: { type: Number },
    font: { type: String },
    title: { type: String },
    content: { type: String },
    link: { type: String },
});

let ComponentModel: Model<Component> = mongoose.models?.Component;
if (!ComponentModel) {
    ComponentModel = mongoose.model<Component>('Component', ComponentSchema);
}
function isComponent(object: unknown): object is Component {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    return (
        'blockId' in object &&
        'componentType' in object &&
        'content' in object &&
        'title' in object &&
        'position' in object
    );
}

export { ComponentModel, isComponent };
export type { Component };
