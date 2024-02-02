import { Maintainer, MaintainerClass } from 'showed/models/maintainer';
import connection from 'showed/lib/core/database/connection';
import { stringToObjectId } from 'showed/lib/core/database/utils';
import RepositoryInterface from 'showed/lib/maintainer/repository';
export default class Repository implements RepositoryInterface {
    public async getMaintainers(filter: {
        limit?: number;
    }): Promise<MaintainerClass[]> {
        await connection();

        const limit = filter.limit ?? 10;

        const maintainers = await Maintainer.find().limit(limit).lean().exec();

        return maintainers;
    }

    public async createMaintainer(email: string): Promise<void> {
        await connection();
        await Maintainer.create({ email });
    }

    public async updateMaintainer(
        id: string,
        maintainerData: { email?: string; name?: string; surname?: string }
    ): Promise<void> {
        await connection();

        const parsedId = stringToObjectId(id);

        await Maintainer.findByIdAndUpdate(parsedId, maintainerData, {
            new: true,
        })
            .lean()
            .exec();
    }
}
