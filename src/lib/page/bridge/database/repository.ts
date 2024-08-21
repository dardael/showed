import { PageModel } from 'showed/lib/page/models/page';
import type { Page } from 'showed/lib/page/models/page';
import RepositoryInterface from 'showed/lib/page/repository';
import type Database from 'showed/lib/core/database/service/database';
import { SortOrder } from 'showed/lib/core/database/model/sortOrder';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async getPages(filter: { limit?: number }): Promise<Page[]> {
        return this.database.find<Page>(PageModel, {
            ...filter,
            sort: { position: SortOrder.ASC },
        });
    }

    public async createPage(pageData: {
        title: string;
        urlPart: string;
        position: number;
    }): Promise<Page> {
        return this.database.create<Page>(PageModel, pageData);
    }

    public async updatePage(
        id: string,
        pageData: {
            title?: string;
            urlPart?: string;
            position: number;
        }
    ): Promise<Page> {
        return this.database.findByIdAndUpdate<Page>(PageModel, id, pageData);
    }

    public async deletePage(id: string): Promise<Page> {
        return this.database.findByIdAndDelete<Page>(PageModel, id);
    }
}
