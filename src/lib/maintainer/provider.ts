import ProviderInterface from 'showed/lib/maintainer/service/provider';
import type Repository from 'showed/lib/maintainer/repository';
import { MaintainerClass } from 'showed/lib/maintainer/models/maintainer';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    public async createMaintainer(email: string): Promise<MaintainerClass> {
        return this.repository.createMaintainer(email);
    }

    public async updateMaintainer(
        id: string,
        update: { email?: string; name?: string; surname?: string }
    ): Promise<MaintainerClass> {
        return this.repository.updateMaintainer(id, update);
    }
    public async getMaintainer(): Promise<MaintainerClass | undefined> {
        const maintainers = await this.repository.getMaintainers({ limit: 1 });
        return maintainers?.pop();
    }
}
