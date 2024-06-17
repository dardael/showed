import { SocialNetworkClass } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from './models/socialNetworkName';
export default interface Repository {
    getSocialNetworks(name: SocialNetworkName): Promise<SocialNetworkClass[]>;
    createSocialNetwork(socialNetworkData: {
        name?: SocialNetworkName;
        link?: string;
        text?: string;
    }): Promise<SocialNetworkClass>;
    updateSocialNetwork(
        id: string,
        socialNetworkData: {
            text?: string;
            name?: SocialNetworkName;
            link?: string;
        }
    ): Promise<SocialNetworkClass>;
}
