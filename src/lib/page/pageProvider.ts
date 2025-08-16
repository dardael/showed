import PageProviderInterface from 'showed/lib/page/service/pageProvider';
import type PageRepository from 'showed/lib/page/pageRepository';
import type BlockRepository from 'showed/lib/page/blockRepository';
import type ComponentRepository from 'showed/lib/page/componentRepository';
import { isPage, type Page } from 'showed/lib/page/models/page';
import { SortDirection } from './models/sortDirection';
import Provider from '../file/service/provider';
import { Component } from './models/component';
import { Block } from './models/block';

export default class PageProvider implements PageProviderInterface {
    constructor(
        private repository: PageRepository,
        private blockRepository: BlockRepository,
        private componentRepository: ComponentRepository,
        private fileProvider: Provider
    ) {
        this.repository = repository;
        this.blockRepository = blockRepository;
        this.componentRepository = componentRepository;
        this.fileProvider = fileProvider;
    }

    public async createPage(pageData: {
        title: string;
        position: number;
        width?: number;
    }): Promise<Page> {
        return this.repository.createPage({
            ...pageData,
            urlPart: this.getUriFromPage(pageData.title),
        });
    }
    public async updatePage(
        id: string,
        update: {
            title: string;
            width?: number;
            position: number;
            soundId?: string;
        }
    ): Promise<Page> {
        return this.repository.updatePage(id, {
            ...update,
            urlPart: this.getUriFromPage(update.title),
        });
    }
    public async getPages(): Promise<Page[]> {
        const pages = await this.repository.getPages();
        return pages;
    }

    public async getPagesWithChildren(): Promise<Page[]> {
        const pages = await this.repository.getPages();
        for (const page of pages) {
            page.children = (await this.getChildren(page)) as Block[];
        }
        return pages;
    }

    private async getChildren(
        element: Page | Block
    ): Promise<(Block | Component)[]> {
        if (isPage(element)) {
            const blocks = await this.blockRepository.getBlocks({
                pageId: element._id as string,
            });
            for (const block of blocks) {
                block.children = await this.getChildren(block);
            }
            return blocks;
        }
        const blocks = await this.blockRepository.getBlocks({
            parentBlockId: element._id as string,
        });
        for (const block of blocks) {
            block.children = await this.getChildren(block);
        }
        const components = await this.componentRepository.getComponents({
            blockId: element._id as string,
        });
        return [...blocks, ...components].sort(
            (a, b) => a.position - b.position
        );
    }

    public async deletePage(id: string): Promise<Page> {
        const deletedPage = await this.repository.deletePage(id);
        if (deletedPage.soundId) {
            await this.fileProvider.deleteFile(deletedPage.soundId);
        }
        await this.updatePagesPosition();
        await this.blockRepository.deletePageBlocks(id);
        return deletedPage;
    }

    public async movePage(
        page: Page,
        sortDirection: SortDirection
    ): Promise<Page[]> {
        const pages = await this.repository.getPages();
        const pageToMove = pages.find((p) => p._id === page._id);
        if (!pageToMove) {
            throw new Error('Page not found');
        }
        const currentPageToMoveIndex = pages.indexOf(pageToMove);
        if (currentPageToMoveIndex === -1) {
            throw new Error('Page to move not found in the list');
        }

        let updatedElements: Page[];

        if (sortDirection === SortDirection.TOP) {
            updatedElements = pages.map((el) => {
                if (el._id === page._id) {
                    return { ...el, position: 1 };
                } else if (el.position < pageToMove.position) {
                    return { ...el, position: el.position + 1 };
                } else {
                    return el;
                }
            });
        } else if (sortDirection === SortDirection.BOTTOM) {
            updatedElements = pages.map((el) => {
                if (el._id === page._id) {
                    return { ...el, position: pages.length };
                } else if (el.position > pageToMove.position) {
                    return { ...el, position: el.position - 1 };
                } else {
                    return el;
                }
            });
        } else if (currentPageToMoveIndex >= 0) {
            const elementToSwitch =
                sortDirection === SortDirection.UP
                    ? pages[currentPageToMoveIndex - 1]
                    : pages[currentPageToMoveIndex + 1];
            if (!elementToSwitch) {
                throw new Error(
                    `Cannot move page ${sortDirection === SortDirection.UP ? 'up' : 'down'}`
                );
            }
            const newPosition = elementToSwitch.position;
            elementToSwitch.position = pageToMove.position;
            pageToMove.position = newPosition;

            updatedElements = pages.map((el) => ({ ...el }));
        } else {
            throw new Error('Unknown sort direction');
        }

        for (const el of updatedElements) {
            await this.repository.updatePage(el._id as string, {
                position: el.position,
            });
        }

        return updatedElements
            .sort((a, b) => a.position - b.position)
            .map((el) => ({ ...el }));
    }
    private async updatePagesPosition(): Promise<Page[]> {
        const pages = await this.repository.getPages();
        pages.forEach(async (page, index) => {
            page.position = index + 1;
            await this.repository.updatePage(page._id as string, {
                position: page.position,
            });
        });
        return pages;
    }
    private getUriFromPage(title: string): string {
        return title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/--/g, '-')
            .replace(/'/g, '-')
            .replace(/ /g, '-')
            .toLowerCase();
    }
}
