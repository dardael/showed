import type { Page } from 'showed/lib/page/models/page';
import type { Component } from 'showed/lib/page/models/component';
import { ComponentType } from './models/componentType';
export default interface Repository {
    getPages(filter: { limit?: number }): Promise<Page[]>;
    createPage(pageData: {
        title: string;
        urlPart: string;
        position: number;
    }): Promise<Page>;
    updatePage(
        id: string,
        pageData: {
            title?: string;
            urlPart?: string;
            position: number;
        }
    ): Promise<Page>;
    deletePage(id: string): Promise<Page>;
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
