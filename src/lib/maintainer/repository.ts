import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';
export default interface Repository {
    getMaintainers(filter: { limit?: number }): Promise<Maintainer[]>;
    createMaintainer(maintainerData: {
        email?: string;
        name?: string;
        surname?: string;
    }): Promise<Maintainer>;
    updateMaintainer(
        id: string,
        maintainerData: { email?: string; name?: string; surname?: string }
    ): Promise<Maintainer>;
}
