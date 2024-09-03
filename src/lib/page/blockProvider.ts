import BlockProviderInterface from 'showed/lib/page/service/blockProvider';
import type BlockRepository from 'showed/lib/page/blockRepository';
import type { Block } from 'showed/lib/page/models/block';
import { SortDirection } from './models/sortDirection';
import ComponentRepository from './componentRepository';

export default class BlockProvider implements BlockProviderInterface {
    constructor(
        private repository: BlockRepository,
        private componentRepository: ComponentRepository
    ) {
        this.repository = repository;
        this.componentRepository = componentRepository;
    }
    public async createBlock(blockData: {
        pageId: string;
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
            pageId: block.pageId,
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
