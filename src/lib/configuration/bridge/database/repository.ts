import { ConfigurationModel } from 'showed/lib/configuration/models/configuration';
import type { Configuration } from 'showed/lib/configuration/models/configuration';
import RepositoryInterface from 'showed/lib/configuration/repository';
import type Database from 'showed/lib/core/database/service/database';
import { ConfigurationKey } from '../../models/configurationKey';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async get(key: ConfigurationKey): Promise<string | null> {
        const configurations = await this.database.find<Configuration>(
            ConfigurationModel,
            { model: { key } }
        );
        return configurations.length > 0 ? configurations[0].value : null;
    }

    public async set(key: ConfigurationKey, value: string): Promise<void> {
        const existingConfig = await this.database.find<Configuration>(
            ConfigurationModel,
            { model: { key } }
        );
        if (existingConfig.length > 0) {
            await this.database.findByIdAndUpdate<Configuration>(
                ConfigurationModel,
                existingConfig[0]._id as string,
                { value }
            );
            return;
        }
        await this.database.create<Configuration>(ConfigurationModel, {
            key,
            value,
        });
        return;
    }
}
