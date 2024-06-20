import { SocialNetworkModel } from 'showed/lib/socialNetwork/models/socialNetwork';
import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import RepositoryInterface from 'showed/lib/socialNetwork/repository';
import type Database from 'showed/lib/core/database/service/database';
import { SocialNetworkName } from '../../models/socialNetworkName';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async getSocialNetworks(
        name: SocialNetworkName
    ): Promise<SocialNetwork[]> {
        return this.database.find<SocialNetwork>(SocialNetworkModel, {
            model: { name: name },
        });
    }

    public async createSocialNetwork(SocialNetworkData: {
        name?: SocialNetworkName;
        link?: string;
        text?: string;
    }): Promise<SocialNetwork> {
        return this.database.create<SocialNetwork>(
            SocialNetworkModel,
            SocialNetworkData
        );
    }

    public async updateSocialNetwork(
        id: string,
        socialNetworkData: {
            link?: string;
            name?: SocialNetworkName;
            text?: string;
        }
    ): Promise<SocialNetwork> {
        return this.database.findByIdAndUpdate<SocialNetwork>(
            SocialNetworkModel,
            id,
            socialNetworkData
        );
    }
}
