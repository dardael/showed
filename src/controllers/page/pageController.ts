'use server';
import 'showed/lib/core/dependencyInjection/container';
import type { Page } from 'showed/lib/page/models/page';
import Provider from 'showed/lib/page/provider';
import { Container } from 'typedi';

export async function savePage(data: FormData): Promise<Page> {
    const id = data.get('id')?.toString();
    const title = data.get('title')?.toString();
    const content = data.get('content')?.toString();
    if (!title || !content) {
        return await Promise.reject(
            new Error('Title and content are required')
        );
    }
    const provider: Provider = Container.get('PageProvider');
    let updatedPage;
    if (id) {
        updatedPage = await provider.updatePage(id, {
            title,
            content,
        });
    } else {
        updatedPage = await provider.createPage({
            title,
            content,
        });
    }
    return updatedPage;
}

export async function getPage(): Promise<Page | undefined> {
    const provider: Provider = Container.get('PageProvider');
    const page = await provider.getPage();
    return page;
}
