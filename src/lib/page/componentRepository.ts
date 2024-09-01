import type { Component } from 'showed/lib/page/models/component';
import { ComponentType } from './models/componentType';
export default interface ComponentRepository {
    getComponents(filter: {
        blockId: string;
        limit?: number;
    }): Promise<Component[]>;
    createComponent(ComponentData: {
        componentType: ComponentType;
        blockId: string;
        content: string;
        link?: string;
        title: string;
        position: number;
    }): Promise<Component>;
    updateComponent(
        id: string,
        componentData: {
            content?: string;
            link?: string;
            position: number;
            title?: string;
        }
    ): Promise<Component>;
    deleteComponent(id: string): Promise<Component>;
    deleteBlockComponents(blockId: string): Promise<void>;
}
