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
    // Text block specific properties
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
    alignment?: 'left' | 'center' | 'right' | 'justify';
    foregroundColor?: string;
    backgroundColor?: string;
};
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

export { isComponent };
export type { Component };
