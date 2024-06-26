import { Model } from 'mongoose';

export default interface Database {
    find<U>(
        model: Model<U>,
        filter: {
            limit?: number;
            model?: any;
        }
    ): Promise<U[]>;
    create<U>(model: Model<U>, data: any): Promise<U>;
    findByIdAndUpdate<U>(model: Model<U>, id: string, data: any): Promise<U>;
    findByIdAndDelete<U>(model: Model<U>, id: string): Promise<U>;
}
