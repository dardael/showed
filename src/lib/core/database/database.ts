import DatabaseInterface from 'showed/lib/core/database/service/database';
import connectToDb from 'showed/lib/core/database/connection';
import {
    AnyParamConstructor,
    BeAnObject,
    ReturnModelType,
} from '@typegoose/typegoose/lib/types';
import { stringToObjectId } from './utils';
import { injectable } from 'tsyringe';

@injectable()
export default class Database implements DatabaseInterface {
    public async find<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(
        model: ReturnModelType<U, QueryHelpers>,
        filter: {
            limit?: number;
        }
    ): Promise<object[]> {
        await connectToDb();

        const limit = filter.limit ?? 10;

        const foundItems = await model.find().limit(limit).lean().exec();

        return foundItems as U[];
    }

    public async create<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(model: ReturnModelType<U, QueryHelpers>, data: any): Promise<void> {
        await connectToDb();
        await model.create(data);
    }

    public async findByIdAndUpdate<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(
        model: ReturnModelType<U, QueryHelpers>,
        id: string,
        data: any
    ): Promise<void> {
        await connectToDb();

        const parsedId = stringToObjectId(id);

        await model
            .findByIdAndUpdate(parsedId, data, {
                new: true,
            })
            .lean()
            .exec();
    }
}
