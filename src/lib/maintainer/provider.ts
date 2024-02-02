import ProviderInterface from 'showed/lib/maintainer/service/provider';
import type Repository from 'showed/lib/maintainer/repository';
import { MaintainerClass } from 'showed/models/maintainer';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class Provider implements ProviderInterface {
    constructor(
        @inject('MaintainerRepository') private repository: Repository
    ) {
        this.repository = repository;
    }

    public createMaintainer(email: string): void {
        this.repository.createMaintainer(email);
    }

    public updateMaintainer(
        id: string,
        update: { email?: string; name?: string; surname?: string }
    ): void {
        this.repository.updateMaintainer(id, update);
    }
    public async getMaintainer(): Promise<MaintainerClass | undefined> {
        const maintainers = await this.repository.getMaintainers({ limit: 1 });
        return maintainers?.pop();
    }
}
