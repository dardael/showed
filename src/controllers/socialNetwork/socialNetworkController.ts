'use server';
import 'showed/lib/core/dependencyInjection/container';
import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import {
    SocialNetworkName,
    getSocialNetworkName,
} from 'showed/lib/socialNetwork/models/socialNetworkName';
import Provider from 'showed/lib/socialNetwork/provider';
import { getService } from 'showed/lib/core/dependencyInjection/getter';
export async function saveSocialNetwork(
    data: FormData
): Promise<SocialNetwork> {
    const id = data.get('id')?.toString();
    const name = getSocialNetworkName(data.get('name')?.toString());
    const text = data.get('text')?.toString();
    const link = data.get('link')?.toString();

    const provider: Provider = getService('SocialNetworkProvider');
    let socialNetwork: SocialNetwork;
    if (id) {
        socialNetwork = await provider.updateSocialNetwork(id, {
            name,
            text,
            link,
        });
    } else {
        socialNetwork = await provider.createSocialNetwork({
            name,
            text,
            link,
        });
    }
    return socialNetwork;
}

export async function getSocialNetwork(
    name: SocialNetworkName
): Promise<SocialNetwork | undefined> {
    const provider: Provider = getService('SocialNetworkProvider');
    const socialNetwork = await provider.getSocialNetwork(name);
    return socialNetwork;
}

export async function getSocialNetworks(): Promise<SocialNetwork[]> {
    const provider: Provider = getService('SocialNetworkProvider');
    const socialNetworks = await provider.getSocialNetworks();
    return socialNetworks;
}
