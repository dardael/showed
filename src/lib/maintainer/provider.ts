import ProviderInterface from 'showed/lib/maintainer/service/provider';
import type Repository from 'showed/lib/maintainer/repository';
import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';
import EncodingProvider from 'showed/lib/core/security/service/encodingProvider';
import Authentificator from 'showed/lib/core/authentification/service/authentificator';

export default class Provider implements ProviderInterface {
    constructor(
        private repository: Repository,
        private encodingProvider: EncodingProvider,
        private authentificator: Authentificator
    ) {
        this.repository = repository;
        this.encodingProvider = encodingProvider;
        this.authentificator = authentificator;
    }

    public async createMaintainer(maintainerData: {
        email?: string;
        name?: string;
        surname?: string;
    }): Promise<Maintainer> {
        return this.repository.createMaintainer(maintainerData);
    }

    public async updateMaintainer(
        id: string,
        update: { email?: string; name?: string; surname?: string }
    ): Promise<Maintainer> {
        return this.repository.updateMaintainer(id, update);
    }

    public async getMaintainer(): Promise<Maintainer | undefined> {
        const maintainers = await this.repository.getMaintainers({ limit: 1 });
        return maintainers?.pop();
    }

    public async loginMaintainer(
        email: string,
        password: string,
        token: string
    ): Promise<boolean> {
        const hashedPassword = await this.encodingProvider.hashString(password);
        const isLoginSuccesfull =
            await this.repository.verifyMaintainerCredentials(
                email,
                hashedPassword
            );
        if (isLoginSuccesfull) {
            this.authentificator.saveAuthentification(token);
        }
        return isLoginSuccesfull;
    }

    public async savePassword(password: string): Promise<void> {
        const encodedPassword = this.encodingProvider.encodeToBase64(password);
        console.log(encodedPassword);
        const hashedPassword =
            await this.encodingProvider.hashString(encodedPassword);
        console.log(hashedPassword);
        await this.repository.savePassword(hashedPassword);
    }
}
