import ProviderInterface from 'showed/lib/page/service/provider';
import type Repository from 'showed/lib/page/repository';
import type { Page } from 'showed/lib/page/models/page';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    public async createPage(pageData: {
        title: string;
        content: string;
    }): Promise<Page> {
        return this.repository.createPage(pageData);
    }

    public async updatePage(
        id: string,
        update: { title: string; content: string }
    ): Promise<Page> {
        return this.repository.updatePage(id, update);
    }
    public async getPage(): Promise<Page | undefined> {
        const pages = await this.repository.getPages({ limit: 1 });
        return pages?.pop();
    }
}
