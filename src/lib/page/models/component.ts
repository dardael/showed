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
function isComponent(object: any): object is Component {
    return (
        object.hasOwnProperty('blockId') &&
        object.hasOwnProperty('componentType') &&
        object.hasOwnProperty('content') &&
        object.hasOwnProperty('title') &&
        object.hasOwnProperty('position')
    );
}

export { ComponentModel, isComponent };
export type { Component };
