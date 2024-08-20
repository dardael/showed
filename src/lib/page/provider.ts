import ProviderInterface from 'showed/lib/page/service/provider';
import type Repository from 'showed/lib/page/repository';
import type { Page } from 'showed/lib/page/models/page';
import type { Component } from 'showed/lib/page/models/component';
import { SortDirection } from './models/sortDirection';
import { ComponentType } from './models/componentType';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    public async createPage(pageData: {
        title: string;
        position: number;
    }): Promise<Page> {
        return this.repository.createPage({
            ...pageData,
            urlPart: this.getUriFromPage(pageData.title),
        });
    }
    public async createComponent(componentData: {
        pageId: string;
        componentType: ComponentType;
        content: string;
        title: string;
        position: number;
    }): Promise<Component> {
        return this.repository.createComponent(componentData);
    }
    public async updatePage(
        id: string,
        update: { title: string; position: number }
    ): Promise<Page> {
        return this.repository.updatePage(id, {
            ...update,
            urlPart: this.getUriFromPage(update.title),
        });
    }

    public async updateComponent(
        id: string,
        update: { title: string; content: string; position: number }
    ): Promise<Component> {
        return this.repository.updateComponent(id, update);
    }
    public async getPages(): Promise<Page[]> {
        const pages = await this.repository.getPages({});
        return pages;
    }

    public async getComponents(pageId: string): Promise<Component[]> {
        const components = await this.repository.getComponents({ pageId });
        return components;
    }

    public async deletePage(id: string): Promise<Page> {
        const deletedPage = await this.repository.deletePage(id);
        await this.updatePagesPosition();
        await this.repository.deletePageComponents(id);
        return deletedPage;
    }

    public async deleteComponent(id: string): Promise<Component> {
        const deletedComponent = await this.repository.deleteComponent(id);
        await this.updateComponentsPosition(deletedComponent.pageId as string);
        return deletedComponent;
    }

    public async movePage(
        page: Page,
        sortDirection: SortDirection
    ): Promise<void> {
        const pages = await this.repository.getPages({});
        const pageToMove = pages.find((p) => p._id === page._id);
        if (!pageToMove) {
            throw new Error('Page not found');
        }
        const currentPageToMoveIndex = pages.indexOf(pageToMove);
        let pageToSwitch: Page;
        if (sortDirection === SortDirection.UP) {
            if (currentPageToMoveIndex === 0) {
                throw new Error('Cannot move page up');
            }
            pageToSwitch = pages[currentPageToMoveIndex - 1];
        } else if (sortDirection === SortDirection.DOWN) {
            if (currentPageToMoveIndex === pages.length - 1) {
                throw new Error('Cannot move page down');
            }
            pageToSwitch = pages[currentPageToMoveIndex + 1];
        } else {
            throw new Error('Unknown sort direction');
        }
        pageToMove.position = pageToSwitch.position;
        pageToSwitch.position = currentPageToMoveIndex + 1;
        await this.repository.updatePage(pageToSwitch._id as string, {
            position: pageToSwitch.position,
        });
        await this.repository.updatePage(pageToMove._id as string, {
            position: pageToMove.position,
        });
    }
    public async moveComponent(
        component: Component,
        sortDirection: SortDirection
    ): Promise<void> {
        const components = await this.repository.getComponents({
            pageId: component.pageId,
        });
        const componentToMove = components.find((p) => p._id === component._id);
        if (!componentToMove) {
            throw new Error('Component not found');
        }
        const currentComponentToMoveIndex = components.indexOf(componentToMove);
        let componentToSwitch: Component;
        if (sortDirection === SortDirection.UP) {
            if (currentComponentToMoveIndex === 0) {
                throw new Error('Cannot move component up');
            }
            componentToSwitch = components[currentComponentToMoveIndex - 1];
        } else if (sortDirection === SortDirection.DOWN) {
            if (currentComponentToMoveIndex === components.length - 1) {
                throw new Error('Cannot move component down');
            }
            componentToSwitch = components[currentComponentToMoveIndex + 1];
        } else {
            throw new Error('Unknown sort direction');
        }
        componentToMove.position = componentToSwitch.position;
        componentToSwitch.position = currentComponentToMoveIndex + 1;
        await this.repository.updateComponent(componentToSwitch._id as string, {
            position: componentToSwitch.position,
        });
        await this.repository.updateComponent(componentToMove._id as string, {
            position: componentToMove.position,
        });
    }

    private async updatePagesPosition(): Promise<Page[]> {
        const pages = await this.repository.getPages({});
        pages.forEach(async (page, index) => {
            page.position = index + 1;
            await this.repository.updatePage(page._id as string, {
                position: page.position,
            });
        });
        return pages;
    }

    private async updateComponentsPosition(
        pageId: string
    ): Promise<Component[]> {
        const components = await this.repository.getComponents({ pageId });
        components.forEach(async (component, index) => {
            component.position = index + 1;
            await this.repository.updateComponent(component._id as string, {
                position: component.position,
            });
        });
        return components;
    }

    private getUriFromPage(title: string): string {
        return title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/--/g, '-')
            .replace(/'/g, '-')
            .replace(/ /g, '-')
            .toLowerCase();
    }
}
