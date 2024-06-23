import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from './models/socialNetworkName';
export default interface Repository {
    getSocialNetworks(name?: SocialNetworkName): Promise<SocialNetwork[]>;
    createSocialNetwork(socialNetworkData: {
        name?: SocialNetworkName;
        link?: string;
        text?: string;
    }): Promise<SocialNetwork>;
    updateSocialNetwork(
        id: string,
        socialNetworkData: {
            text?: string;
            name?: SocialNetworkName;
            link?: string;
        }
    ): Promise<SocialNetwork>;
}
