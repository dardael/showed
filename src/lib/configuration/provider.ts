import ProviderInterface from 'showed/lib/configuration/service/provider';
import type Repository from 'showed/lib/configuration/repository';
import { ConfigurationKey } from './models/configurationKey';
export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }
    public async get(key: ConfigurationKey): Promise<string | null> {
        return this.repository.get(key);
    }
    public async set(key: ConfigurationKey, value: string): Promise<void> {
        return this.repository.set(key, value);
    }
}
