import { FilterQuery, Model, SortOrder } from 'mongoose';

export default interface Database {
    find<U>(
        model: Model<U>,
        filter: {
            limit?: number;
            model?: FilterQuery<U>;
            sort?: { [key: string]: SortOrder };
            isLike?: boolean;
        }
    ): Promise<U[]>;
    create<U>(
        model: Model<U>,
        data: FilterQuery<U> & { _id?: string }
    ): Promise<U>;
    findByIdAndUpdate<U>(
        model: Model<U>,
        id: string,
        data: FilterQuery<U>
    ): Promise<U>;
    findByIdAndDelete<U>(model: Model<U>, id: string): Promise<U>;
    deleteMany<U>(model: Model<U>, data: FilterQuery<U>): Promise<void>;
}
