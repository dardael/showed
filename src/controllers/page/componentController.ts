'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import ComponentProvider from 'showed/lib/page/componentProvider';
import { Container } from 'typedi';

export async function saveComponent(data: FormData): Promise<Component> {
    const id = data.get('id')?.toString();
    const content = data.get('content')?.toString();
    const position = data.get('position')?.toString();
    const title = data.get('title')?.toString() as string;
    if (!id) {
        return await Promise.reject(new Error('Component id is missing'));
    }
    if (!content || !position) {
        return await Promise.reject(
            new Error('Position and content are required')
        );
    }
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.updateComponent(id, {
        content,
        title,
        position: Number.parseInt(position),
    });
}

export async function createComponent(
    pageId: string,
    componentType: ComponentType,
    position: number
): Promise<Component> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.createComponent({
        componentType,
        pageId,
        title: 'Nouveau composant',
        content: '',
        position,
    });
}

export async function getComponents(pageId: string): Promise<Component[]> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.getComponents(pageId);
}

export async function deleteComponent(id: string): Promise<Component> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    return provider.deleteComponent(id);
}

export async function moveComponent(
    component: Component,
    direction: SortDirection
): Promise<void> {
    const provider: ComponentProvider = Container.get('ComponentProvider');
    provider.moveComponent(component, direction);
}
