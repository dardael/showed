import type { Page } from 'showed/lib/page/models/page';
import { SortDirection } from '../models/sortDirection';

export default interface PageProvider {
    createPage(pageData: {
        title: string;
        position: number;
        width?: number;
    }): Promise<Page>;
    updatePage(
        id: string,
        update: {
            title: string;
            position: number;
            width?: number;
            soundId?: string;
        }
    ): Promise<Page>;
    getPages(): Promise<Page[]>;
    getPagesWithChildren(): Promise<Page[]>;
    deletePage(id: string): Promise<Page>;
    movePage(page: Page, sortDirection: SortDirection): Promise<Page[]>;
}
