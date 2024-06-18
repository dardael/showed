import { MaintainerClass } from 'showed/lib/maintainer/models/maintainer';
export default interface Repository {
    getMaintainers(filter: { limit?: number }): Promise<MaintainerClass[]>;
    createMaintainer(email: string): Promise<MaintainerClass>;
    updateMaintainer(
        id: string,
        maintainerData: { email?: string; name?: string; surname?: string }
    ): Promise<MaintainerClass>;
}
