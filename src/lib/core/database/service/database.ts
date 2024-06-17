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
            model?: any;
        }
    ): Promise<object[]>;
    create<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(
        model: ReturnModelType<U, QueryHelpers>,
        data: any
    ): Promise<object>;
    findByIdAndUpdate<
        U extends AnyParamConstructor<any>,
        QueryHelpers = BeAnObject,
    >(
        model: ReturnModelType<U, QueryHelpers>,
        id: string,
        data: { email?: string; name?: string; surname?: string }
    ): Promise<object>;
}
