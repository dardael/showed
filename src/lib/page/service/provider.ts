import type { Page } from 'showed/lib/page/models/page';

export default interface Provider {
    createPage(pageData: { title: string; content: string }): Promise<Page>;
    updatePage(
        id: string,
        update: { title: string; content: string }
    ): Promise<Page>;
    getPage(): Promise<Page | undefined>;
}
