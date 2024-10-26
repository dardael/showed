import type { Component } from 'showed/lib/page/models/component';
import { SortDirection } from '../models/sortDirection';
import { ComponentType } from '../models/componentType';
import { Font } from 'showed/lib/theme/models/font';

export default interface ComponentProvider {
    createComponent(componentData: {
        blockId: string;
        componentType: ComponentType;
        content: string;
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
            width?: number;
            font?: Font;
        }
    ): Promise<Component>;
    getComponents(blockId: string): Promise<Component[]>;
    deleteComponent(id: string): Promise<Component>;
    moveComponent(
        component: Component,
        sortDirection: SortDirection
    ): Promise<void>;
}
