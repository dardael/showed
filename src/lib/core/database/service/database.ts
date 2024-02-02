import {
    AnyParamConstructor,
    BeAnObject,
    ReturnModelType,
} from '@typegoose/typegoose/lib/types';

export default interface Database {
    find<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
        model: ReturnModelType<U, QueryHelpers>,
        filter: {
            limit?: number;
        }
    ): Promise<object[]>;
    create<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
        model: ReturnModelType<U, QueryHelpers>,
        data: any
    ): Promise<void>;
    findByIdAndUpdate<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(
        model: ReturnModelType<U, QueryHelpers>,
        id: string,
        data: { email?: string; name?: string; surname?: string }
    ): Promise<void>;
}
