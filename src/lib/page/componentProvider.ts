import ComponentProviderInterface from 'showed/lib/page/service/componentProvider';
import type ComponentRepository from 'showed/lib/page/componentRepository';
import type { Component } from 'showed/lib/page/models/component';
import { SortDirection } from './models/sortDirection';
import { ComponentType } from './models/componentType';

export default class ComponentProvider implements ComponentProviderInterface {
    constructor(private repository: ComponentRepository) {
        this.repository = repository;
    }
    public async createComponent(componentData: {
        pageId: string;
        componentType: ComponentType;
        content: string;
        title: string;
        position: number;
    }): Promise<Component> {
        return this.repository.createComponent(componentData);
    }
    public async updateComponent(
        id: string,
        update: { title: string; content: string; position: number }
    ): Promise<Component> {
        return this.repository.updateComponent(id, update);
    }

    public async getComponents(pageId: string): Promise<Component[]> {
        const components = await this.repository.getComponents({ pageId });
        return components;
    }

    public async deleteComponent(id: string): Promise<Component> {
        const deletedComponent = await this.repository.deleteComponent(id);
        await this.updateComponentsPosition(deletedComponent.pageId as string);
        return deletedComponent;
    }
    
    public async moveComponent(
        component: Component,
        sortDirection: SortDirection
    ): Promise<void> {
        const components = await this.repository.getComponents({
            pageId: component.pageId,
        });
        const componentToMove = components.find((p) => p._id === component._id);
        if (!componentToMove) {
            throw new Error('Component not found');
        }
        const currentComponentToMoveIndex = components.indexOf(componentToMove);
        let componentToSwitch: Component;
        if (sortDirection === SortDirection.UP) {
            if (currentComponentToMoveIndex === 0) {
                throw new Error('Cannot move component up');
            }
            componentToSwitch = components[currentComponentToMoveIndex - 1];
        } else if (sortDirection === SortDirection.DOWN) {
            if (currentComponentToMoveIndex === components.length - 1) {
                throw new Error('Cannot move component down');
            }
            componentToSwitch = components[currentComponentToMoveIndex + 1];
        } else {
            throw new Error('Unknown sort direction');
        }
        componentToMove.position = componentToSwitch.position;
        componentToSwitch.position = currentComponentToMoveIndex + 1;
        await this.repository.updateComponent(componentToSwitch._id as string, {
            position: componentToSwitch.position,
        });
        await this.repository.updateComponent(componentToMove._id as string, {
            position: componentToMove.position,
        });
    }

    private async updateComponentsPosition(
        pageId: string
    ): Promise<Component[]> {
        const components = await this.repository.getComponents({ pageId });
        components.forEach(async (component, index) => {
            component.position = index + 1;
            await this.repository.updateComponent(component._id as string, {
                position: component.position,
            });
        });
        return components;
    }
}
