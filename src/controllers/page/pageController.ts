'use server';
import 'showed/lib/core/dependencyInjection/container';
import type { Page } from 'showed/lib/page/models/page';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import Provider from 'showed/lib/page/provider';
import { Container } from 'typedi';

export async function savePage(data: FormData): Promise<Page> {
    const id = data.get('id')?.toString();
    const title = data.get('title')?.toString();
    const content = data.get('content')?.toString();
    const position = data.get('position')?.toString();
    if (!id) {
        return await Promise.reject(new Error('Page id is missing'));
    }
    if (!title || !content || !position) {
        return await Promise.reject(
            new Error('Title, position and content are required')
        );
    }
    const provider: Provider = Container.get('PageProvider');
    return provider.updatePage(id, {
        title,
        content,
        position: Number.parseInt(position),
    });
}

export async function createPage(position: number): Promise<Page> {
    const provider: Provider = Container.get('PageProvider');
    return provider.createPage({
        title: 'Nouvelle page',
        content: 'Contenu de la page',
        position,
    });
}

export async function getPages(): Promise<Page[]> {
    const provider: Provider = Container.get('PageProvider');
    const page = await provider.getPages();
    return page;
}

export async function deletePage(id: string): Promise<Page> {
    const provider: Provider = Container.get('PageProvider');
    return provider.deletePage(id);
}

export async function movePage(
    page: Page,
    direction: SortDirection
): Promise<void> {
    const provider: Provider = Container.get('PageProvider');
    provider.movePage(page, direction);
}
