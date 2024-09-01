import type { Component } from 'showed/lib/page/models/component';
import { SortDirection } from '../models/sortDirection';
import { ComponentType } from '../models/componentType';

export default interface ComponentProvider {
    createComponent(componentData: {
        blockId: string;
        componentType: ComponentType;
        content: string;
        link?: string;
        title: string;
        position: number;
    }): Promise<Component>;
    updateComponent(
        id: string,
        update: {
            link?: string;
            title: string;
            content: string;
            position: number;
        }
    ): Promise<Component>;
    getComponents(blockId: string): Promise<Component[]>;
    deleteComponent(id: string): Promise<Component>;
    moveComponent(
        component: Component,
        sortDirection: SortDirection
    ): Promise<void>;
}
