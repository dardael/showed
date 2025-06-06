import DatabaseInterface from 'showed/lib/core/database/service/database';
import connectToDb from 'showed/lib/core/database/connection';
import { FilterQuery, Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { SortOrder } from './model/sortOrder';

export default class Database implements DatabaseInterface {
    public async find<U>(
        model: Model<U>,
        filter: {
            limit?: number;
            model?: FilterQuery<U>;
            sort?: { [key: string]: SortOrder };
            isLike?: boolean;
        }
    ): Promise<U[]> {
        await connectToDb();

        let query;
        if (filter.model) {
            query = model.find(filter.model);
        } else {
            query = model.find();
        }
        if (filter.sort) {
            query = query.sort(filter.sort);
        }
        if (filter.isLike) {
            query = query.collation({ locale: 'en_US', strength: 1 });
        }
        if (filter.limit) {
            query = query.limit(filter.limit);
        }
        const foundItems = await query.lean().exec();
        return foundItems as U[];
    }

    public async deleteMany<U>(
        model: Model<U>,
        data: FilterQuery<U>
    ): Promise<void> {
        await connectToDb();
        await model.deleteMany(data);
    }

    public async findByIdAndDelete<U>(model: Model<U>, id: string): Promise<U> {
        await connectToDb();

        const deletedObject = await model.findByIdAndDelete(id);
        return deletedObject?.toObject() as U;
    }

    public async create<U>(
        model: Model<U>,
        data: FilterQuery<U> & {
            _id?: string;
            createdAt?: Date;
            updatedAt?: Date;
        }
    ): Promise<U> {
        await connectToDb();
        data._id = this.getNewId();
        if ('createdAt' in data) {
            data.createdAt = new Date();
        }
        if ('updatedAt' in data) {
            data.updatedAt = new Date();
        }
        const created = await model.create(data);
        return created.toObject() as U;
    }

    public async findByIdAndUpdate<U>(
        model: Model<U>,
        id: string,
        data: FilterQuery<U> & { updatedAt?: Date }
    ): Promise<U> {
        await connectToDb();

        if ('updatedAt' in data) {
            data.updatedAt = new Date();
        }

        const updatedObject = await model.findByIdAndUpdate(id, data, {
            new: true,
            overwrite: true,
        });
        return updatedObject?.toObject() as U;
    }
    public getNewId(): string {
        return nanoid();
    }
}
