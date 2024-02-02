import {
    Maintainer,
    MaintainerClass,
} from 'showed/lib/maintainer/models/maintainer';
import RepositoryInterface from 'showed/lib/maintainer/repository';
import { injectable, inject } from 'tsyringe';
import type Database from 'showed/lib/core/database/service/database';

@injectable()
export default class Repository implements RepositoryInterface {
    constructor(@inject('Database') private database: Database) {
        this.database = database;
    }

    public async getMaintainers(filter: {
        limit?: number;
    }): Promise<MaintainerClass[]> {
        const maintainers = (await this.database.find(
            Maintainer,
            filter
        )) as MaintainerClass[];

        return maintainers;
    }

    public async createMaintainer(email: string): Promise<void> {
        await this.database.create(Maintainer, { email });
    }

    public async updateMaintainer(
        id: string,
        maintainerData: { email?: string; name?: string; surname?: string }
    ): Promise<void> {
        await this.database.findByIdAndUpdate(Maintainer, id, maintainerData);
    }
}
