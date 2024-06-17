import {
    SocialNetwork,
    SocialNetworkClass,
} from 'showed/lib/socialNetwork/models/socialNetwork';
import RepositoryInterface from 'showed/lib/socialNetwork/repository';
import { injectable, inject } from 'tsyringe';
import type Database from 'showed/lib/core/database/service/database';
import { SocialNetworkName } from '../../models/socialNetworkName';

@injectable()
export default class Repository implements RepositoryInterface {
    constructor(@inject('Database') private database: Database) {
        this.database = database;
    }

    public async getSocialNetworks(
        name: SocialNetworkName
    ): Promise<SocialNetworkClass[]> {
        const socialNetworks = (await this.database.find(SocialNetwork, {
            model: { name: name },
        })) as SocialNetworkClass[];
        return socialNetworks;
    }

    public async createSocialNetwork(SocialNetworkData: {
        name?: SocialNetworkName;
        link?: string;
        text?: string;
    }): Promise<SocialNetworkClass> {
        const socialNetwork = (await this.database.create(
            SocialNetwork,
            SocialNetworkData
        )) as SocialNetworkClass;
        return socialNetwork;
    }

    public async updateSocialNetwork(
        id: string,
        socialNetworkData: {
            link?: string;
            name?: SocialNetworkName;
            text?: string;
        }
    ): Promise<SocialNetworkClass> {
        const socialNetwork = (await this.database.findByIdAndUpdate(
            SocialNetwork,
            id,
            socialNetworkData
        )) as SocialNetworkClass;
        return socialNetwork;
    }
}
