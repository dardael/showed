import ProviderInterface from 'showed/lib/socialNetwork/service/provider';
import type Repository from 'showed/lib/socialNetwork/repository';
import { SocialNetworkClass } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    public async createSocialNetwork(socialNetworkData: {
        text?: string;
        name?: SocialNetworkName;
        link?: string;
    }): Promise<SocialNetworkClass> {
        this.updatePhoneNumberLink(socialNetworkData);
        return this.repository.createSocialNetwork(socialNetworkData);
    }

    public async updateSocialNetwork(
        id: string,
        update: { text?: string; name?: SocialNetworkName; link?: string }
    ): Promise<SocialNetworkClass> {
        this.updatePhoneNumberLink(update);
        return this.repository.updateSocialNetwork(id, update);
    }
    public async getSocialNetwork(
        name: SocialNetworkName
    ): Promise<SocialNetworkClass | undefined> {
        const socialNetworks = await this.repository.getSocialNetworks(name);
        const socialNetwork = socialNetworks?.pop();
        if (socialNetwork && socialNetwork?.name === SocialNetworkName.Phone) {
            socialNetwork.link = this.getParsedPhoneNumberLink(
                socialNetwork.link
            );
        }
        return socialNetwork;
    }

    private updatePhoneNumberLink(socialNetwork: {
        name?: string;
        link?: string;
    }): { name?: string; link?: string } {
        if (socialNetwork.name === SocialNetworkName.Phone) {
            socialNetwork.link = `tel:${socialNetwork.link?.replace(/ /g, '')}`;
        }
        return socialNetwork;
    }

    private getParsedPhoneNumberLink(link: string): string {
        return link.replace('tel:', '');
    }
}
