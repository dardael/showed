import ComponentRepositoryInterface from 'showed/lib/page/componentRepository';
import type Database from 'showed/lib/core/database/service/database';
import { SortOrder } from 'showed/lib/core/database/model/sortOrder';
import type { Component } from '../../models/component';
import { ComponentModel } from 'showed/lib/page/models/component';
import { ComponentType } from '../../models/componentType';

export default class ComponentRepository
    implements ComponentRepositoryInterface
{
    constructor(private database: Database) {
        this.database = database;
    }
    public async getComponents(filter: {
        pageId: string;
        limit?: number;
    }): Promise<Component[]> {
        return this.database.find<Component>(ComponentModel, {
            ...filter,
            sort: { position: SortOrder.ASC },
        });
    }

    public async createComponent(componentData: {
        pageId: string;
        componentType: ComponentType;
        title: string;
        content: string;
        position: number;
    }): Promise<Component> {
        return this.database.create<Component>(ComponentModel, componentData);
    }

    public async updateComponent(
        id: string,
        componentData: {
            title?: string;
            content?: string;
            position: number;
        }
    ): Promise<Component> {
        return this.database.findByIdAndUpdate<Component>(
            ComponentModel,
            id,
            componentData
        );
    }

    public async deleteComponent(id: string): Promise<Component> {
        return this.database.findByIdAndDelete<Component>(ComponentModel, id);
    }

    public async deletePageComponents(pageId: string): Promise<void> {
        this.database.deleteMany<Component>(ComponentModel, { pageId });
    }
}
