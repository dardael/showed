import type { Page } from 'showed/lib/page/models/page';
export default interface PageRepository {
    getPages(): Promise<Page[]>;
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
            soundId?: string;
        }
    ): Promise<Page>;
    deletePage(id: string): Promise<Page>;
}
