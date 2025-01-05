import DatabaseInterface from 'showed/lib/core/database/service/database';
import connectToDb from 'showed/lib/core/database/connection';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

export default class Database implements DatabaseInterface {
    public async find<U>(
        model: Model<U>,
        filter: {
            limit?: number;
            model?: any;
            sort?: any;
            isLike?: boolean;
        }
    ): Promise<U[]> {
        await connectToDb();

        let query = model.find(filter.model).sort(filter.sort);
        if (filter.isLike) {
            query = query.collation({ locale: 'en_US', strength: 1 });
        }
        if (filter.limit) {
            query = query.limit(filter.limit);
        }
        const foundItems = await query.lean().exec();
        return foundItems as U[];
    }

    public async deleteMany<U>(model: Model<U>, data: any): Promise<void> {
        await connectToDb();
        const deletedObjects = await model.deleteMany(data);
    }

    public async findByIdAndDelete<U>(model: Model<U>, id: string): Promise<U> {
        await connectToDb();

        const deletedObject = await model.findByIdAndDelete(id);
        return deletedObject?.toObject() as U;
    }

    public async create<U>(model: Model<U>, data: any): Promise<U> {
        await connectToDb();
        data._id = nanoid();
        const created = await model.create(data);
        return created.toObject() as U;
    }

    public async findByIdAndUpdate<U>(
        model: Model<U>,
        id: string,
        data: any
    ): Promise<U> {
        await connectToDb();

        const updatedObject = await model.findByIdAndUpdate(id, data, {
            new: true,
            overwrite: true,
        });
        return updatedObject?.toObject() as U;
    }
}
