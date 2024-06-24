import type { Page } from 'showed/lib/page/models/page';
export default interface Repository {
    getPages(filter: { limit?: number }): Promise<Page[]>;
    createPage(pageData: { title: string; content: string }): Promise<Page>;
    updatePage(
        id: string,
        pageData: { title: string; content: string }
    ): Promise<Page>;
}
