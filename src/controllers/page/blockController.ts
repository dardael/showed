'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Block } from 'showed/lib/page/models/block';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import BlockProvider from 'showed/lib/page/blockProvider';
import { Container } from 'typedi';
import { Component } from 'showed/lib/page/models/component';

export async function saveBlock(data: FormData): Promise<Block> {
    const id = data.get('id')?.toString();
    const backgroundImageId = data.get('backgroundImageId')?.toString();
    const position = data.get('position')?.toString();
    const title = data.get('title')?.toString() as string;
    const hasTransparentBackground = Boolean(
        data.get('hasTransparentBackground')
    );
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
        hasTransparentBackground,
    });
}

export async function createBlock(
    position: number,
    pageId?: string,
    parentBlockId?: string
): Promise<Block> {
    const provider: BlockProvider = Container.get('BlockProvider');
    return provider.createBlock({
        pageId,
        parentBlockId,
        title: 'Nouveau block',
        position,
        hasTransparentBackground: false,
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

export async function moveChildElement(
    element: Block | Component,
    direction: SortDirection
): Promise<void> {
    const provider: BlockProvider = Container.get('BlockProvider');
    provider.moveChildElement(element, direction);
}

export async function getChildElements(
    parentBlockId: string
): Promise<(Block | Component)[]> {
    const provider: BlockProvider = Container.get('BlockProvider');
    return provider.getChildElements(parentBlockId);
}
