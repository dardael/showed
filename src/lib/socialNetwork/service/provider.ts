import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from '../models/socialNetworkName';

export default interface Provider {
    createSocialNetwork(socialNetworkData: {
        link?: string;
        name?: SocialNetworkName;
        text?: string;
    }): Promise<SocialNetwork>;
    updateSocialNetwork(
        id: string,
        socialNetworkData: {
            link?: string;
            name?: SocialNetworkName;
            text?: string;
        }
    ): Promise<SocialNetwork>;
    getSocialNetwork(name: string): Promise<SocialNetwork | undefined>;
    getSocialNetworks(): Promise<SocialNetwork[]>;
}
