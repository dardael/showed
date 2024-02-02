import ProviderInterface from 'showed/lib/maintainer/service/provider';
import Repository from 'showed/lib/maintainer/repository';
import { MaintainerClass } from 'showed/models/maintainer';

export default class Provider implements ProviderInterface {
    private repository: Repository;

    constructor(repository: Repository) {
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
