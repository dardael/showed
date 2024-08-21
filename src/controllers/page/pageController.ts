'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import type { Page } from 'showed/lib/page/models/page';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import PageProvider from 'showed/lib/page/pageProvider';
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
    const provider: PageProvider = Container.get('PageProvider');
    return provider.updatePage(id, {
        title,
        position: Number.parseInt(position),
    });
}

export async function createPage(position: number): Promise<Page> {
    const provider: PageProvider = Container.get('PageProvider');
    return provider.createPage({
        title: 'Nouvelle page',
        position,
    });
}

export async function getPages(): Promise<Page[]> {
    const provider: PageProvider = Container.get('PageProvider');
    const page = await provider.getPages();
    return page;
}

export async function deletePage(id: string): Promise<Page> {
    const provider: PageProvider = Container.get('PageProvider');
    return provider.deletePage(id);
}

export async function movePage(
    page: Page,
    direction: SortDirection
): Promise<void> {
    const provider: PageProvider = Container.get('PageProvider');
    provider.movePage(page, direction);
}
