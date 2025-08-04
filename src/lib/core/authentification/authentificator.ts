import AuthentificatorInterface from 'showed/lib/core/authentification/service/authentificator';
import RepositoryInterface from 'showed/lib/core/authentification/repository';
export default class Authentificator implements AuthentificatorInterface {
    private repository: RepositoryInterface;
    constructor(repository: RepositoryInterface) {
        this.repository = repository;
    }
    public async isAlreadyAuthentified(token: string): Promise<boolean> {
        const authentified = await this.repository.getAuthentified(token);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const isAlreadyAuthentified =
            authentified !== null && authentified.createdAt
                ? new Date(authentified.createdAt) >= oneWeekAgo
                : false;
        if (!isAlreadyAuthentified && authentified) {
            await this.repository.deleteAuthentified(token);
        }
        return isAlreadyAuthentified;
    }
    public async saveAuthentification(token: string): Promise<void> {
        const authentified = await this.repository.getAuthentified(token);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        if (authentified?.createdAt) {
            const createdDate = new Date(authentified.createdAt);

            if (createdDate < oneWeekAgo) {
                await this.repository.deleteAuthentified(token);
                await this.repository.createAuthentified(token);
            } else {
                return;
            }
        } else {
            await this.repository.createAuthentified(token);
        }
    }
    public async logout(token: string): Promise<void> {
        await this.repository.deleteAuthentified(token);
        return;
    }
}
