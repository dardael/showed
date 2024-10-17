import type { Block } from 'showed/lib/page/models/block';
import { BlockType } from './models/blockType';
export default interface BlockRepository {
    getBlocks(filter: {
        pageId?: string;
        parentBlockId?: string;
    }): Promise<Block[]>;
    createBlock(BlockData: {
        pageId?: string;
        parentBlockId?: string;
        hasTransparentBackground?: boolean;
        backgroundImageId?: string;
        title: string;
        position: number;
        blockType?: BlockType;
    }): Promise<Block>;
    updateBlock(
        id: string,
        blockData: {
            hasTransparentBackground?: boolean;
            backgroundImageId?: string;
            position: number;
            title?: string;
        }
    ): Promise<Block>;
    deleteBlock(id: string): Promise<Block>;
    deletePageBlocks(pageId: string): Promise<void>;
}
