import ProviderInterface from 'showed/lib/socialNetwork/service/provider';
import type Repository from 'showed/lib/socialNetwork/repository';
import { SocialNetworkClass } from 'showed/lib/socialNetwork/models/socialNetwork';
import { injectable, inject } from 'tsyringe';
import { SocialNetworkName } from './models/socialNetworkName';

@injectable()
export default class Provider implements ProviderInterface {
    constructor(
        @inject('SocialNetworkRepository') private repository: Repository
    ) {
        this.repository = repository;
    }

    public createSocialNetwork(socialNetworkData: {
        text?: string;
        name?: SocialNetworkName;
        link?: string;
    }): Promise<SocialNetworkClass> {
        return this.repository.createSocialNetwork(socialNetworkData);
    }

    public updateSocialNetwork(
        id: string,
        update: { text?: string; name?: SocialNetworkName; link?: string }
    ): Promise<SocialNetworkClass> {
        return this.repository.updateSocialNetwork(id, update);
    }
    public async getSocialNetwork(
        name: SocialNetworkName
    ): Promise<SocialNetworkClass | undefined> {
        const socialNetworks = await this.repository.getSocialNetworks(name);
        return socialNetworks?.pop();
    }
}
