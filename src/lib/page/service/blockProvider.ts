import type { Block } from 'showed/lib/page/models/block';
import { SortDirection } from '../models/sortDirection';
import { Component } from '../models/component';

export default interface BlockProvider {
    createBlock(blockData: {
        pageId?: string;
        parentBlockId?: string;
        backgroundImageId?: string;
        title: string;
        position: number;
        hasTransparentBackground: boolean;
    }): Promise<Block>;
    updateBlock(
        id: string,
        update: {
            title: string;
            backgroundImageId?: string;
            position: number;
            hasTransparentBackground: boolean;
        }
    ): Promise<Block>;
    getBlocks(pageId: string): Promise<Block[]>;
    getChildElements(parentBlockId: string): Promise<(Block | Component)[]>;
    deleteBlock(id: string): Promise<Block>;
    moveBlock(block: Block, sortDirection: SortDirection): Promise<void>;
    moveChildElement(
        element: Component | Block,
        sortDirection: SortDirection
    ): Promise<void>;
}
