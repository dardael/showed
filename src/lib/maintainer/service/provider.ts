import { MaintainerClass } from 'showed/lib/maintainer/models/maintainer';

export default interface Provider {
    createMaintainer(email: string): Promise<MaintainerClass>;
    updateMaintainer(
        id: string,
        update: { email?: string; name?: string; surname?: string }
    ): Promise<MaintainerClass>;
    getMaintainer(): Promise<MaintainerClass | undefined>;
}
