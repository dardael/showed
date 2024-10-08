import BlockRepositoryInterface from 'showed/lib/page/blockRepository';
import type Database from 'showed/lib/core/database/service/database';
import { SortOrder } from 'showed/lib/core/database/model/sortOrder';
import type { Block } from '../../models/block';
import { BlockModel } from 'showed/lib/page/models/block';
import ComponentRepository from '../../componentRepository';

export default class BlockRepository implements BlockRepositoryInterface {
    constructor(
        private database: Database,
        private componentRepository: ComponentRepository
    ) {
        this.database = database;
        this.componentRepository = componentRepository;
    }
    public async getBlocks(filter: {
        pageId?: string;
        parentBlockId?: string;
    }): Promise<Block[]> {
        return this.database.find<Block>(BlockModel, {
            model: filter,
            sort: { position: SortOrder.ASC },
        });
    }

    public async createBlock(blockData: {
        pageId?: string;
        parentBlockId?: string;
        title: string;
        backgroundImageId?: string;
        hasTransparentBackground?: boolean;
        position: number;
    }): Promise<Block> {
        return this.database.create<Block>(BlockModel, blockData);
    }

    public async updateBlock(
        id: string,
        blockData: {
            title?: string;
            hasTransparentBackground?: boolean;
            backgroundImageId?: string;
            position: number;
        }
    ): Promise<Block> {
        return this.database.findByIdAndUpdate<Block>(
            BlockModel,
            id,
            blockData
        );
    }

    public async deleteBlock(id: string): Promise<Block> {
        const childBlocks = await this.getBlocks({ parentBlockId: id });
        childBlocks.forEach((block) => this.deleteBlock(block._id as string));
        await this.componentRepository.deleteBlockComponents(id);

        return this.database.findByIdAndDelete<Block>(BlockModel, id);
    }

    public async deletePageBlocks(pageId: string): Promise<void> {
        const blocks = await this.getBlocks({ pageId });
        blocks.forEach((block) => this.deleteBlock(block._id as string));
    }
}
