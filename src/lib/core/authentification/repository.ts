import type { Authentified } from 'showed/lib/core/authentification/models/authentified';
export default interface Repository {
    getAuthentified(token: string): Promise<Authentified | null>;
    createAuthentified(token: string): Promise<void>;
    deleteAuthentified(token: string): Promise<void>;
}
