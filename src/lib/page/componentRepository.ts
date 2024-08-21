import type { Component } from 'showed/lib/page/models/component';
import { ComponentType } from './models/componentType';
export default interface ComponentRepository {
    getComponents(filter: {
        pageId: string;
        limit?: number;
    }): Promise<Component[]>;
    createComponent(ComponentData: {
        componentType: ComponentType;
        pageId: string;
        content: string;
        title: string;
        position: number;
    }): Promise<Component>;
    updateComponent(
        id: string,
        componentData: {
            content?: string;
            position: number;
            title?: string;
        }
    ): Promise<Component>;
    deleteComponent(id: string): Promise<Component>;
    deletePageComponents(pageId: string): Promise<void>;
}
