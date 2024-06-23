import { ReactNode } from 'react';
import { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import SocialNetworkIcon from '../socialNetworkIcon';

export default class Link {
    label: string | undefined;
    target: string | undefined;
    icone: ReactNode;

    constructor(
        label: string | undefined,
        target: string | undefined,
        icone: ReactNode
    ) {
        this.label = label;
        this.target = target;
        this.icone = icone;
    }

    public static fromSocialNetwork(socialNetwork: SocialNetwork): Link {
        return new Link(
            socialNetwork.text,
            socialNetwork.link,
            SocialNetworkIcon({ socialNetwork })
        );
    }
}
