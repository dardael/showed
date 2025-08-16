import type { Component } from 'showed/lib/page/models/component';
import { ComponentType } from './models/componentType';
import { Font } from '../theme/models/font';
export default interface ComponentRepository {
    getComponents(filter: { blockId: string }): Promise<Component[]>;
    createComponent(ComponentData: {
        componentType: ComponentType;
        blockId: string;
        content: string;
        title: string;
        width?: number;
        link?: string;
        font?: Font;
        position: number;
    }): Promise<Component>;
    updateComponent(
        id: string,
        componentData: {
            content?: string;
            position: number;
            title?: string;
            width?: number;
            link?: string;
            font?: Font;
        }
    ): Promise<Component>;
    deleteComponent(id: string): Promise<Component>;
    deleteBlockComponents(blockId: string): Promise<void>;
}
