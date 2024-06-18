import DatabaseInterface from 'showed/lib/core/database/service/database';
import connectToDb from 'showed/lib/core/database/connection';
import {
    AnyParamConstructor,
    BeAnObject,
    ReturnModelType,
} from '@typegoose/typegoose/lib/types';
import { stringToObjectId } from './utils';

export default class Database implements DatabaseInterface {
    public async find<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(
        model: ReturnModelType<U, QueryHelpers>,
        filter: {
            limit?: number;
            model?: any;
        }
    ): Promise<object[]> {
        await connectToDb();

        const limit = filter.limit ?? 10;

        const foundItems = await model
            .find(filter.model)
            .limit(limit)
            .lean()
            .exec();

        return foundItems as U[];
    }

    public async create<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(model: ReturnModelType<U, QueryHelpers>, data: any): Promise<object> {
        await connectToDb();
        const created = await model.create(data);
        return created.toObject() as U;
    }

    public async findByIdAndUpdate<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(
        model: ReturnModelType<U, QueryHelpers>,
        id: string,
        data: any
    ): Promise<object> {
        await connectToDb();

        const parsedId = stringToObjectId(id);

        const updatedObject = await model.findByIdAndUpdate(parsedId, data, {
            new: true,
        });
        return updatedObject?.toObject() as U;
    }
}
