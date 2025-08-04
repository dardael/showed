import { AuthentifiedModel } from 'showed/lib/core/authentification/models/authentified';
import type { Authentified } from 'showed/lib/core/authentification/models/authentified';
import RepositoryInterface from 'showed/lib/core/authentification/repository';
import type Database from 'showed/lib/core/database/service/database';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async getAuthentified(token: string): Promise<Authentified | null> {
        const authentifieds = await this.database.find<Authentified>(
            AuthentifiedModel,
            { model: { token } }
        );
        return authentifieds.length > 0 ? authentifieds[0] : null;
    }

    public async createAuthentified(token: string): Promise<void> {
        await this.database.create<Authentified>(AuthentifiedModel, {
            token,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    public async deleteAuthentified(token: string): Promise<void> {
        await this.database.deleteMany<Authentified>(AuthentifiedModel, {
            token,
        });
    }
}
