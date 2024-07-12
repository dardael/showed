import type { Page } from 'showed/lib/page/models/page';
export default interface Repository {
    getPages(filter: { limit?: number }): Promise<Page[]>;
    createPage(pageData: {
        title: string;
        urlPart: string;
        content: string;
        position: number;
    }): Promise<Page>;
    updatePage(
        id: string,
        pageData: {
            title?: string;
            urlPart?: string;
            content?: string;
            position: number;
        }
    ): Promise<Page>;
    deletePage(id: string): Promise<Page>;
}
