import BlockProviderInterface from 'showed/lib/page/service/blockProvider';
import type BlockRepository from 'showed/lib/page/blockRepository';
import { isBlock, type Block } from 'showed/lib/page/models/block';
import { SortDirection } from './models/sortDirection';
import ComponentRepository from './componentRepository';
import { Component } from './models/component';

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
    }): Promise<Block> {
        return this.repository.createBlock(blockData);
    }
    public async updateBlock(
        id: string,
        update: {
            title: string;
            backgroundImageId?: string;
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

    public async moveBlock(
        block: Block,
        sortDirection: SortDirection
    ): Promise<void> {
        const blocks = await this.repository.getBlocks({
            pageId: block.pageId as string,
        });
        const blockToMove = blocks.find((p) => p._id === block._id);
        if (!blockToMove) {
            throw new Error('Block not found');
        }
        const currentBlockToMoveIndex = blocks.indexOf(blockToMove);
        let blockToSwitch: Block;
        if (sortDirection === SortDirection.UP) {
            if (currentBlockToMoveIndex === 0) {
                throw new Error('Cannot move block up');
            }
            blockToSwitch = blocks[currentBlockToMoveIndex - 1];
        } else if (sortDirection === SortDirection.DOWN) {
            if (currentBlockToMoveIndex === blocks.length - 1) {
                throw new Error('Cannot move block down');
            }
            blockToSwitch = blocks[currentBlockToMoveIndex + 1];
        } else {
            throw new Error('Unknown sort direction');
        }
        blockToMove.position = blockToSwitch.position;
        blockToSwitch.position = currentBlockToMoveIndex + 1;
        await this.repository.updateBlock(blockToSwitch._id as string, {
            position: blockToSwitch.position,
        });
        await this.repository.updateBlock(blockToMove._id as string, {
            position: blockToMove.position,
        });
    }

    public async moveChildElement(
        element: Block | Component,
        sortDirection: SortDirection
    ): Promise<void> {
        const parentBlockId = isBlock(element)
            ? element.parentBlockId
            : element.blockId;
        const blocks = await this.repository.getBlocks({
            parentBlockId: parentBlockId,
        });
        const components = await this.componentRepository.getComponents({
            blockId: parentBlockId as string,
        });
        const elements: (Block | Component)[] = [...blocks, ...components];
        const elementToMove = elements.find((p) => p._id === element._id);
        if (!elementToMove) {
            throw new Error('Element not found');
        }
        const currentElementToMoveIndex = elements.indexOf(elementToMove);
        let elementToSwitch: Block | Component;
        if (sortDirection === SortDirection.UP) {
            if (currentElementToMoveIndex === 0) {
                throw new Error('Cannot move element up');
            }
            elementToSwitch = blocks[currentElementToMoveIndex - 1];
        } else if (sortDirection === SortDirection.DOWN) {
            if (currentElementToMoveIndex === elements.length - 1) {
                throw new Error('Cannot move element down');
            }
            elementToSwitch = elements[currentElementToMoveIndex + 1];
        } else {
            throw new Error('Unknown sort direction');
        }

        elementToMove.position = elementToSwitch.position;
        elementToSwitch.position = currentElementToMoveIndex + 1;
        if (isBlock(elementToSwitch)) {
            await this.repository.updateBlock(elementToSwitch._id as string, {
                position: elementToSwitch.position,
            });
        } else {
            await this.componentRepository.updateComponent(
                elementToSwitch._id as string,
                {
                    position: elementToSwitch.position,
                }
            );
        }
        if (isBlock(elementToMove)) {
            await this.repository.updateBlock(elementToMove._id as string, {
                position: elementToMove.position,
            });
        } else {
            await this.componentRepository.updateComponent(
                elementToMove._id as string,
                {
                    position: elementToMove.position,
                }
            );
        }
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
