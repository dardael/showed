import { SocialNetworkClass } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from '../models/socialNetworkName';

export default interface Provider {
    createSocialNetwork(socialNetworkData: {
        link?: string;
        name?: SocialNetworkName;
        text?: string;
    }): Promise<SocialNetworkClass>;
    updateSocialNetwork(
        id: string,
        socialNetworkData: {
            link?: string;
            name?: SocialNetworkName;
            text?: string;
        }
    ): Promise<SocialNetworkClass>;
    getSocialNetwork(name: string): Promise<SocialNetworkClass | undefined>;
}
