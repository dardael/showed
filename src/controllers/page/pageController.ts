'use server';
import type { Page } from 'showed/lib/page/models/page';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import PageProvider from 'showed/lib/page/service/pageProvider';
import { revalidatePath } from 'next/cache';
import { getService } from '#src/lib/core/dependencyInjection/getter';

export async function savePage(data: FormData): Promise<Page> {
    const id = data.get('id')?.toString();
    const title = data.get('title')?.toString();
    const width = data.get('width')?.toString();
    const position = data.get('position')?.toString();
    const soundId = data.get('soundId')?.toString();
    if (!id) {
        return await Promise.reject(new Error('Page id is missing'));
    }
    if (!title || !position) {
        return await Promise.reject(
            new Error('Title and position are required')
        );
    }
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    return provider.updatePage(id, {
        title,
        width: width ? Number.parseInt(width) : 0,
        position: Number.parseInt(position),
        soundId,
    });
}

export async function createPage(position: number): Promise<Page> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    return provider.createPage({
        title: 'Nouvelle page',
        position,
    });
}

export async function duplicatePage(
    page: Page,
    position: number
): Promise<Page> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    const dataToDuplicate = {
        position: position,
        title: page.title,
        width: page.width,
    };
    return provider.createPage(dataToDuplicate);
}

export async function getPages(): Promise<Page[]> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    const page = await provider.getPages();
    return page;
}

export async function getPagesWithChildren(): Promise<Page[]> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    const pages = await provider.getPagesWithChildren();
    return pages;
}

export async function deletePage(id: string): Promise<Page> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    return provider.deletePage(id);
}

export async function movePage(
    page: Page,
    direction: SortDirection
): Promise<Page[]> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    return provider.movePage(page, direction);
}

export async function reloadPage(id: string): Promise<void> {
    const provider: PageProvider = getService<PageProvider>('PageProvider');
    const page = (await provider.getPages()).find((p) => p._id === id);
    if (!page) {
        return await Promise.reject(new Error('Page not found'));
    }
    revalidatePath('/page/' + page.urlPart + '?id=' + page.urlPart);
}
