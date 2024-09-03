import type { Block } from 'showed/lib/page/models/block';
export default interface BlockRepository {
    getBlocks(filter: { pageId: string }): Promise<Block[]>;
    createBlock(BlockData: {
        pageId: string;
        backgroundImageId?: string;
        title: string;
        position: number;
    }): Promise<Block>;
    updateBlock(
        id: string,
        blockData: {
            backgroundImageId?: string;
            position: number;
            title?: string;
        }
    ): Promise<Block>;
    deleteBlock(id: string): Promise<Block>;
    deletePageBlocks(pageId: string): Promise<void>;
}
