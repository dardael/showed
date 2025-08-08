import { ConfigurationKey } from '../models/configurationKey';

export default interface Provider {
    get(key: ConfigurationKey): Promise<string | null>;
    set(key: ConfigurationKey, value: string): Promise<void>;
}
