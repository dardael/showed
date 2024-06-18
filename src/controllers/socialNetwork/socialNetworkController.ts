'use server';
import 'showed/lib/core/dependencyInjection/container';
import { SocialNetworkClass } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';
import Provider from 'showed/lib/socialNetwork/provider';
import { Container } from 'typedi';

export async function saveSocialNetwork(
    data: FormData
): Promise<SocialNetworkClass> {
    const id = data.get('id')?.toString();
    const name = SocialNetworkName.getSocialNetworkName(
        data.get('name')?.toString()
    );
    const text = data.get('text')?.toString();
    const link = data.get('link')?.toString();

    const provider: Provider = Container.get('SocialNetworkProvider');
    let socialNetwork: SocialNetworkClass;
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
): Promise<SocialNetworkClass | undefined> {
    const provider: Provider = Container.get('SocialNetworkProvider');
    const socialNetwork = await provider.getSocialNetwork(name);
    return socialNetwork;
}
