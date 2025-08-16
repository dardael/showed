import BlockProviderInterface from 'showed/lib/page/service/blockProvider';
import type BlockRepository from 'showed/lib/page/blockRepository';
import { isBlock, type Block } from 'showed/lib/page/models/block';
import { SortDirection } from './models/sortDirection';
import ComponentRepository from './componentRepository';
import { Component } from './models/component';
import { BlockType } from './models/blockType';

export default class BlockProvider implements BlockProviderInterface {
    constructor(
        private repository: BlockRepository,
        private componentRepository: ComponentRepository
    ) {
        this.repository = repository;
        this.componentRepository = componentRepository;
    }
    public async createBlock(blockData: {
        pageId?: string;
        parentBlockId?: string;
        backgroundImageId?: string;
        hasTransparentBackground: boolean;
        title: string;
        position: number;
        blockType?: BlockType;
        isVisibleOnlyWhenInvitedToMeal?: boolean;
        isVisibleOnlyWhenInvitedToReception?: boolean;
        isVisibleOnlyWhenInvitedToTownHall?: boolean;
    }): Promise<Block> {
        return this.repository.createBlock(blockData);
    }
    public async updateBlock(
        id: string,
        update: {
            title: string;
            backgroundImageId?: string;
            isVisibleOnlyWhenInvitedToMeal: boolean;
            isVisibleOnlyWhenInvitedToReception: boolean;
            isVisibleOnlyWhenInvitedToTownHall: boolean;
            position: number;
            hasTransparentBackground: boolean;
        }
    ): Promise<Block> {
        return this.repository.updateBlock(id, update);
    }

    public async getBlocks(pageId: string): Promise<Block[]> {
        const blocks = await this.repository.getBlocks({ pageId });
        return blocks;
    }

    public async deleteBlock(id: string): Promise<Block> {
        const deletedBlock = await this.repository.deleteBlock(id);
        await this.updateBlocksPosition(deletedBlock.pageId as string);
        await this.componentRepository.deleteBlockComponents(
            deletedBlock._id as string
        );
        return deletedBlock;
    }

    public async moveChildElement(
        element: Block | Component,
        sortDirection: SortDirection
    ): Promise<(Block | Component)[]> {
        const parentBlockId = isBlock(element)
            ? element.pageId || element.parentBlockId
            : element.blockId;
        let blocks;
        if (isBlock(element) && element.pageId) {
            blocks = await this.repository.getBlocks({
                pageId: element.pageId,
            });
        } else {
            blocks = await this.repository.getBlocks({
                parentBlockId: parentBlockId,
            });
        }
        const components = await this.componentRepository.getComponents({
            blockId: parentBlockId as string,
        });
        const elements: (Block | Component)[] = [...blocks, ...components];
        const elementToMove = elements.find((p) => p._id === element._id);
        if (!elementToMove) {
            throw new Error('Element not found');
        }
        const currentElementToMoveIndex = elements.indexOf(elementToMove);
        if (currentElementToMoveIndex === -1) {
            throw new Error('Element to move not found in the list');
        }

        let updatedElements: (Block | Component)[];

        if (sortDirection === SortDirection.TOP) {
            updatedElements = elements.map((el) => {
                if (el._id === element._id) {
                    return { ...el, position: 1 };
                } else if (el.position < elementToMove.position) {
                    return { ...el, position: el.position + 1 };
                } else {
                    return el;
                }
            });
        } else if (sortDirection === SortDirection.BOTTOM) {
            updatedElements = elements.map((el) => {
                if (el._id === element._id) {
                    return { ...el, position: elements.length };
                } else if (el.position > elementToMove.position) {
                    return { ...el, position: el.position - 1 };
                } else {
                    return el;
                }
            });
        } else if (currentElementToMoveIndex >= 0) {
            const elementToSwitch =
                sortDirection === SortDirection.UP
                    ? elements[currentElementToMoveIndex - 1]
                    : elements[currentElementToMoveIndex + 1];
            if (!elementToSwitch) {
                throw new Error(
                    `Cannot move element ${sortDirection === SortDirection.UP ? 'up' : 'down'}`
                );
            }
            const newPosition = elementToSwitch.position;
            elementToSwitch.position = elementToMove.position;
            elementToMove.position = newPosition;
            updatedElements = elements.map((el) => ({ ...el }));
        } else {
            throw new Error('Unknown sort direction');
        }

        for (const el of updatedElements) {
            if (isBlock(el)) {
                await this.repository.updateBlock(el._id as string, {
                    position: el.position,
                });
            } else {
                await this.componentRepository.updateComponent(
                    el._id as string,
                    {
                        position: el.position,
                    }
                );
            }
        }

        return updatedElements
            .sort((a, b) => a.position - b.position)
            .map((el) => ({ ...el }));
    }

    public async getChildElements(
        parentBlockId: string
    ): Promise<(Block | Component)[]> {
        const blocks = await this.repository.getBlocks({ parentBlockId });
        const components = await this.componentRepository.getComponents({
            blockId: parentBlockId,
        });
        const elements = [...blocks, ...components];
        return elements.sort((a, b) => a.position - b.position);
    }

    private async updateBlocksPosition(pageId: string): Promise<Block[]> {
        const blocks = await this.repository.getBlocks({ pageId });
        blocks.forEach(async (block, index) => {
            block.position = index + 1;
            await this.repository.updateBlock(block._id as string, {
                position: block.position,
            });
        });
        return blocks;
    }
}
