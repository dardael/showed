'use server';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import ComponentProvider from 'showed/lib/page/componentProvider';
import { Font } from 'showed/lib/theme/models/font';
import { getService } from '#src/lib/core/dependencyInjection/getter';
import { Block } from 'showed/lib/page/models/block';
export async function saveComponent(data: FormData): Promise<Component> {
    const id = data.get('id')?.toString();
    const content = data.get('content')?.toString();
    const position = data.get('position')?.toString();
    const width = data.get('width')?.toString();
    const title = data.get('title')?.toString() as string;
    const link = data.get('link')?.toString() as string;
    const font = data.get('font')?.toString() as Font;
    if (!id) {
        return await Promise.reject(new Error('Component id is missing'));
    }
    if (!content || !position) {
        return await Promise.reject(
            new Error('Position and content are required')
        );
    }
    const provider: ComponentProvider = getService('ComponentProvider');
    return provider.updateComponent(id, {
        link,
        content,
        title,
        position: Number.parseInt(position),
        width: width ? Number.parseInt(width) : 0,
        font,
    });
}

export async function createComponent(
    blockId: string,
    componentType: ComponentType,
    position: number
): Promise<Component> {
    const provider: ComponentProvider = getService('ComponentProvider');
    return provider.createComponent({
        componentType,
        blockId,
        title: 'Nouveau composant',
        content: '',
        position,
    });
}

export async function duplicateComponent(
    component: Component,
    target: Block
): Promise<Component> {
    const provider: ComponentProvider = getService('ComponentProvider');
    const dataToDuplicate = {
        blockId: target._id as string,
        componentType: component.componentType,
        position: target.children ? target.children.length + 1 : 1,
        title: component.title,
        content: component.content,
        width: component.width,
        font: component.font,
        link: component.link,
    };
    return provider.createComponent(dataToDuplicate);
}

export async function getComponents(blockId: string): Promise<Component[]> {
    const provider: ComponentProvider = getService('ComponentProvider');
    return provider.getComponents(blockId);
}

export async function deleteComponent(id: string): Promise<Component> {
    const provider: ComponentProvider = getService('ComponentProvider');
    return provider.deleteComponent(id);
}
