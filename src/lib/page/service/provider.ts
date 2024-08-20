import type { Page } from 'showed/lib/page/models/page';
import type { Component } from 'showed/lib/page/models/component';
import { SortDirection } from '../models/sortDirection';
import { ComponentType } from '../models/componentType';

export default interface Provider {
    createPage(pageData: { title: string; position: number }): Promise<Page>;
    createComponent(componentData: {
        pageId: string;
        componentType: ComponentType;
        content: string;
        title: string;
        position: number;
    }): Promise<Component>;
    updatePage(
        id: string,
        update: { title: string; position: number }
    ): Promise<Page>;
    updateComponent(
        id: string,
        update: { title: string; content: string; position: number }
    ): Promise<Component>;
    getPages(): Promise<Page[]>;
    getComponents(pageId: string): Promise<Component[]>;
    deletePage(id: string): Promise<Page>;
    deleteComponent(id: string): Promise<Component>;
    movePage(page: Page, sortDirection: SortDirection): Promise<void>;
    moveComponent(
        component: Component,
        sortDirection: SortDirection
    ): Promise<void>;
}
