'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import type { Page } from 'showed/lib/page/models/page';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import Provider from 'showed/lib/page/provider';
import ComponentProvider from 'showed/lib/page/componentProvider';
import { Container } from 'typedi';

export async function savePage(data: FormData): Promise<Page> {
    const id = data.get('id')?.toString();
    const title = data.get('title')?.toString();
    const position = data.get('position')?.toString();
    if (!id) {
        return await Promise.reject(new Error('Page id is missing'));
    }
    if (!title || !position) {
        return await Promise.reject(
            new Error('Title and position are required')
        );
    }
    const provider: Provider = Container.get('PageProvider');
    return provider.updatePage(id, {
        title,
        position: Number.parseInt(position),
    });
}

export async function saveComponent(data: FormData): Promise<Component> {
    const id = data.get('id')?.toString();
    const content = data.get('content')?.toString();
    const position = data.get('position')?.toString();
    const title = data.get('title')?.toString() as string;
    if (!id) {
        return await Promise.reject(new Error('Component id is missing'));
    }
    if (!content || !position) {
        return await Promise.reject(
            new Error('Position and content are required')
        );
    }
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.updateComponent(id, {
        content,
        title,
        position: Number.parseInt(position),
    });
}

export async function createPage(position: number): Promise<Page> {
    const provider: Provider = Container.get('PageProvider');
    return provider.createPage({
        title: 'Nouvelle page',
        position,
    });
}

export async function createComponent(
    pageId: string,
    componentType: ComponentType,
    position: number
): Promise<Component> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.createComponent({
        componentType,
        pageId,
        title: 'Nouveau composant',
        content: '',
        position,
    });
}

export async function getPages(): Promise<Page[]> {
    const provider: Provider = Container.get('PageProvider');
    const page = await provider.getPages();
    return page;
}

export async function getComponents(pageId: string): Promise<Component[]> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.getComponents(pageId);
}

export async function deletePage(id: string): Promise<Page> {
    const provider: Provider = Container.get('PageProvider');
    return provider.deletePage(id);
}

export async function deleteComponent(id: string): Promise<Component> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.deleteComponent(id);
}

export async function movePage(
    page: Page,
    direction: SortDirection
): Promise<void> {
    const provider: Provider = Container.get('PageProvider');
    provider.movePage(page, direction);
}

export async function moveComponent(
    component: Component,
    direction: SortDirection
): Promise<void> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    provider.moveComponent(component, direction);
}
