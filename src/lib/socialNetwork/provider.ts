import ProviderInterface from 'showed/lib/socialNetwork/service/provider';
import type Repository from 'showed/lib/socialNetwork/repository';
import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    public async createSocialNetwork(socialNetworkData: {
        text?: string;
        name?: SocialNetworkName;
        link?: string;
    }): Promise<SocialNetwork> {
        this.addLinkPrefixIfNecessary(socialNetworkData);
        return this.repository.createSocialNetwork(socialNetworkData);
    }

    public async updateSocialNetwork(
        id: string,
        update: { text?: string; name?: SocialNetworkName; link?: string }
    ): Promise<SocialNetwork> {
        this.addLinkPrefixIfNecessary(update);
        return this.repository.updateSocialNetwork(id, update);
    }

    public async getSocialNetwork(
        name: SocialNetworkName
    ): Promise<SocialNetwork | undefined> {
        const socialNetworks = await this.repository.getSocialNetworks(name);
        const socialNetwork = socialNetworks?.pop();
        return socialNetwork
            ? this.removeLinkPrefixIfNecessary(socialNetwork)
            : undefined;
    }

    public async getSocialNetworks(): Promise<SocialNetwork[]> {
        const socialNetworks = await this.repository.getSocialNetworks();
        return this.sortSocialNetworks(socialNetworks);
    }

    private sortSocialNetworks(
        socialNetworks: SocialNetwork[]
    ): SocialNetwork[] {
        return socialNetworks.sort((a, b) => {
            if (a.name === SocialNetworkName.Email) {
                return 1;
            }
            if (b.name === SocialNetworkName.Email) {
                return -1;
            }
            if (a.name === SocialNetworkName.Phone) {
                return 1;
            }
            if (b.name === SocialNetworkName.Phone) {
                return -1;
            }
            return a.name?.localeCompare(b.name ?? '') ?? 0;
        });
    }

    private addLinkPrefixIfNecessary(socialNetwork: {
        name?: string;
        link?: string;
    }): { name?: string; link?: string } {
        if (socialNetwork.name === SocialNetworkName.Phone) {
            socialNetwork.link = `tel:${socialNetwork.link?.replace(/ /g, '')}`;
        }
        else if (socialNetwork.name === SocialNetworkName.Email) {
            socialNetwork.link = `mailto:${socialNetwork.link}`;
        }
        return socialNetwork;
    }

    private removeLinkPrefixIfNecessary(
        socialNetwork: SocialNetwork
    ): SocialNetwork {
        if (
            socialNetwork?.link &&
            socialNetwork.name === SocialNetworkName.Phone
        ) {
            socialNetwork.link = socialNetwork.link.replace('tel:', '');
        } else if (
            socialNetwork?.link &&
            socialNetwork.name === SocialNetworkName.Email
        ) {
            socialNetwork.link = socialNetwork.link.replace('mailto:', '');
        }
        return socialNetwork;
    }
}
