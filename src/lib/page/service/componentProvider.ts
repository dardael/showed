import type { Component } from 'showed/lib/page/models/component';
import { SortDirection } from '../models/sortDirection';
import { ComponentType } from '../models/componentType';

export default interface ComponentProvider {
    createComponent(componentData: {
        pageId: string;
        componentType: ComponentType;
        content: string;
        title: string;
        position: number;
    }): Promise<Component>;
    updateComponent(
        id: string,
        update: { title: string; content: string; position: number }
    ): Promise<Component>;
    getComponents(pageId: string): Promise<Component[]>;
    deleteComponent(id: string): Promise<Component>;
    moveComponent(
        component: Component,
        sortDirection: SortDirection
    ): Promise<void>;
}
