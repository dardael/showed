'use server';
import { Block, isBlock } from 'showed/lib/page/models/block';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import BlockProvider from 'showed/lib/page/blockProvider';
import { getService } from '#src/lib/core/dependencyInjection/getter';
import { Component } from 'showed/lib/page/models/component';
import { BlockType } from 'showed/lib/page/models/blockType';
import { isPage, Page } from 'showed/lib/page/models/page';

export async function saveBlock(data: FormData): Promise<Block> {
    const id = data.get('id')?.toString();
    const backgroundImageId = data.get('backgroundImageId')?.toString();
    const position = data.get('position')?.toString();
    const title = data.get('title')?.toString() as string;
    const hasTransparentBackground = Boolean(
        data.get('hasTransparentBackground')
    );
    const isVisibleOnlyWhenInvitedToMeal = Boolean(
        data.get('isVisibleOnlyWhenInvitedToMeal')
    );
    const isVisibleOnlyWhenInvitedToReception = Boolean(
        data.get('isVisibleOnlyWhenInvitedToReception')
    );
    const isVisibleOnlyWhenInvitedToTownHall = Boolean(
        data.get('isVisibleOnlyWhenInvitedToTownHall')
    );
    if (!id) {
        return await Promise.reject(new Error('Block id is missing'));
    }
    if (!position) {
        return await Promise.reject(new Error('Position is required'));
    }
    const provider: BlockProvider = getService('BlockProvider');
    return provider.updateBlock(id, {
        backgroundImageId,
        title,
        position: Number.parseInt(position),
        hasTransparentBackground,
        isVisibleOnlyWhenInvitedToMeal,
        isVisibleOnlyWhenInvitedToReception,
        isVisibleOnlyWhenInvitedToTownHall,
    });
}

export async function createBlock(
    position: number,
    pageId?: string,
    parentBlockId?: string,
    blockType?: BlockType
): Promise<Block> {
    const provider: BlockProvider = getService('BlockProvider');
    return provider.createBlock({
        pageId,
        parentBlockId,
        title: 'Nouveau block',
        position,
        blockType,
        hasTransparentBackground: false,
    });
}

export async function duplicateBlock(
    block: Block,
    target: Page | Block
): Promise<Block> {
    const provider: BlockProvider = getService('BlockProvider');
    const dataToDuplicate = {
        pageId: isPage(target) ? target._id : undefined,
        parentBlockId: isBlock(target) ? target._id : undefined,
        position: target.children ? target.children.length + 1 : 1,
        title: block.title,
        blockType: block.blockType,
        hasTransparentBackground: block.hasTransparentBackground,
        isVisibleOnlyWhenInvitedToMeal: block.isVisibleOnlyWhenInvitedToMeal,
        isVisibleOnlyWhenInvitedToReception:
            block.isVisibleOnlyWhenInvitedToReception,
        isVisibleOnlyWhenInvitedToTownHall:
            block.isVisibleOnlyWhenInvitedToTownHall,
    };
    return provider.createBlock(dataToDuplicate);
}

export async function getBlocks(pageId: string): Promise<Block[]> {
    const provider: BlockProvider = getService('BlockProvider');
    return provider.getBlocks(pageId);
}

export async function deleteBlock(id: string): Promise<Block> {
    const provider: BlockProvider = getService('BlockProvider');
    return provider.deleteBlock(id);
}

export async function moveChildElement(
    element: Block | Component,
    direction: SortDirection
): Promise<(Block | Component)[]> {
    const provider: BlockProvider = getService('BlockProvider');
    return provider.moveChildElement(element, direction);
}

export async function getChildElements(
    parentBlockId: string
): Promise<(Block | Component)[]> {
    const provider: BlockProvider = getService('BlockProvider');
    return provider.getChildElements(parentBlockId);
}
