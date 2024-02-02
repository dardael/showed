import { MaintainerClass } from 'showed/lib/maintainer/models/maintainer';

export default interface Provider {
    createMaintainer(email: string): void;
    updateMaintainer(
        id: string,
        update: { email?: string; name?: string; surname?: string }
    ): void;
    getMaintainer(): Promise<MaintainerClass | undefined>;
}
