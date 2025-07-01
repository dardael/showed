import { MaintainerModel } from 'showed/lib/maintainer/models/maintainer';
import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';
import RepositoryInterface from 'showed/lib/maintainer/repository';
import type Database from 'showed/lib/core/database/service/database';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async getMaintainers(filter: {
        limit?: number;
    }): Promise<Maintainer[]> {
        return this.database.find<Maintainer>(MaintainerModel, filter);
    }

    public async createMaintainer(maintainerData: {
        email?: string;
        name?: string;
        surname?: string;
    }): Promise<Maintainer> {
        return this.database.create<Maintainer>(
            MaintainerModel,
            maintainerData
        );
    }

    public async updateMaintainer(
        id: string,
        maintainerData: { email?: string; name?: string; surname?: string }
    ): Promise<Maintainer> {
        return this.database.findByIdAndUpdate<Maintainer>(
            MaintainerModel,
            id,
            maintainerData
        );
    }

    public async savePassword(password: string): Promise<void> {
        const maintainers = await this.getMaintainers({ limit: 1 });
        const maintainer = maintainers?.pop();
        if (maintainer) {
            await this.database.findByIdAndUpdate<Maintainer>(
                MaintainerModel,
                maintainer._id as string,
                { password }
            );
        } else {
            await this.database.create<Maintainer>(MaintainerModel, {
                password,
            });
        }
    }

    public async verifyMaintainerCredentials(
        email: string,
        password: string
    ): Promise<boolean> {
        const maintainers = await this.getMaintainers({ limit: 1 });
        const maintainer = maintainers?.pop();
        if (!maintainer) {
            return false;
        }
        return password == maintainer.password && email == maintainer.email;
    }
}
