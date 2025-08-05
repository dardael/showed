import AuthentificatorInterface from 'showed/lib/core/authentification/service/authentificator';
import RepositoryInterface from 'showed/lib/core/authentification/repository';
import { Authentified } from './models/authentified';
export default class Authentificator implements AuthentificatorInterface {
    private repository: RepositoryInterface;
    constructor(repository: RepositoryInterface) {
        this.repository = repository;
    }

    public async isAlreadyAuthentified(token: string): Promise<boolean> {
        const authentified = await this.repository.getAuthentified(token);
        const isValid = this.isValidToken(authentified);
        if (!isValid && authentified) {
            await this.repository.deleteAuthentified(token);
        }
        return isValid;
    }

    public async saveAuthentification(token: string): Promise<void> {
        const authentified = await this.repository.getAuthentified(token);
        if (this.isValidToken(authentified)) {
            return;
        }
        if (authentified) {
            await this.repository.deleteAuthentified(token);
        }
        await this.repository.createAuthentified(token);
    }

    public async logout(token: string): Promise<void> {
        await this.repository.deleteAuthentified(token);
        return;
    }

    private isValidToken(authentified: Authentified | null): boolean {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return authentified !== null && authentified.createdAt
            ? new Date(authentified.createdAt) >= oneWeekAgo
            : false;
    }
}
