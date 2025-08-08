import { ConfigurationKey } from './models/configurationKey';

export default interface Repository {
    get(key: ConfigurationKey): Promise<string | null>;
    set(key: ConfigurationKey, value: string): Promise<void>;
}
