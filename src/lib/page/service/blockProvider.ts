import type { Block } from 'showed/lib/page/models/block';
import { SortDirection } from '../models/sortDirection';

export default interface BlockProvider {
    createBlock(blockData: {
        pageId: string;
        backgroundImageId?: string;
        title: string;
        position: number;
    }): Promise<Block>;
    updateBlock(
        id: string,
        update: { title: string; backgroundImageId?: string; position: number }
    ): Promise<Block>;
    getBlocks(pageId: string): Promise<Block[]>;
    deleteBlock(id: string): Promise<Block>;
    moveBlock(block: Block, sortDirection: SortDirection): Promise<void>;
}
