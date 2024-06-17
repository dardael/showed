export enum SocialNetworkName {
    Facebook = 'Facebook',
    Instagram = 'Instagram',
}
export namespace SocialNetworkName {
    export function getSocialNetworkName(
        name: string | undefined
    ): SocialNetworkName {
        if (name === 'Facebook') {
            return SocialNetworkName.Facebook;
        } else if (name === 'Instagram') {
            return SocialNetworkName.Instagram;
        } else {
            throw new Error(`Unknown social network name: ${name}`);
        }
    }
}
