import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';

export default interface Provider {
    createMaintainer(maintainerData: {
        email?: string;
        name?: string;
        surname?: string;
    }): Promise<Maintainer>;
    updateMaintainer(
        id: string,
        update: { email?: string; name?: string; surname?: string }
    ): Promise<Maintainer>;
    getMaintainer(): Promise<Maintainer | undefined>;
}
