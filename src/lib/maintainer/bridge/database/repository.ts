import {
    Maintainer,
    MaintainerClass,
} from 'showed/lib/maintainer/models/maintainer';
import RepositoryInterface from 'showed/lib/maintainer/repository';
import type Database from 'showed/lib/core/database/service/database';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
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

    public async createMaintainer(email: string): Promise<MaintainerClass> {
        const createdMaintainer = await this.database.create(Maintainer, {
            email,
        });
        return createdMaintainer as MaintainerClass;
    }

    public async updateMaintainer(
        id: string,
        maintainerData: { email?: string; name?: string; surname?: string }
    ): Promise<MaintainerClass> {
        const updatedMaintainer = await this.database.findByIdAndUpdate(
            Maintainer,
            id,
            maintainerData
        );
        return updatedMaintainer as MaintainerClass;
    }
}
