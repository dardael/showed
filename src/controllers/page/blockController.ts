'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Block } from 'showed/lib/page/models/block';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import BlockProvider from 'showed/lib/page/blockProvider';
import { Container } from 'typedi';

export async function saveBlock(data: FormData): Promise<Block> {
    const id = data.get('id')?.toString();
    const backgroundImageId = data.get('backgroundImageId')?.toString();
    const position = data.get('position')?.toString();
    const title = data.get('title')?.toString() as string;
    if (!id) {
        return await Promise.reject(new Error('Block id is missing'));
    }
    if (!position) {
        return await Promise.reject(new Error('Position is required'));
    }
    const provider: BlockProvider = Container.get('BlockProvider');
    return provider.updateBlock(id, {
        backgroundImageId,
        title,
        position: Number.parseInt(position),
    });
}

export async function createBlock(
    pageId: string,
    position: number
): Promise<Block> {
    const provider: BlockProvider = Container.get('BlockProvider');
    return provider.createBlock({
        pageId,
        title: 'Nouveau block',
        position,
    });
}

export async function getBlocks(pageId: string): Promise<Block[]> {
    const provider: BlockProvider = Container.get('BlockProvider');
    return provider.getBlocks(pageId);
}

export async function deleteBlock(id: string): Promise<Block> {
    const provider: BlockProvider = Container.get('BlockProvider');
    return provider.deleteBlock(id);
}

export async function moveBlock(
    block: Block,
    direction: SortDirection
): Promise<void> {
    const provider: BlockProvider = Container.get('BlockProvider');
    provider.moveBlock(block, direction);
}
