import type { Page } from 'showed/lib/page/models/page';
import { SortDirection } from '../models/sortDirection';

export default interface Provider {
    createPage(pageData: {
        title: string;
        content: string;
        position: number;
    }): Promise<Page>;
    updatePage(
        id: string,
        update: { title: string; content: string; position: number }
    ): Promise<Page>;
    getPages(): Promise<Page[]>;
    deletePage(id: string): Promise<Page>;
    movePage(page: Page, sortDirection: SortDirection): Promise<void>;
}
