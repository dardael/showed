import mongoose, { Model } from 'mongoose';
import { Component } from './component';

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
    fontFamily: { type: String },
    fontWeight: { type: String },
    fontSize: { type: Number },
    alignment: { type: String },
    foregroundColor: { type: String },
    backgroundColor: { type: String },
});

let ComponentModel: Model<Component> = mongoose.models?.Component;
if (!ComponentModel) {
    ComponentModel = mongoose.model<Component>('Component', ComponentSchema);
}

export { ComponentModel };
