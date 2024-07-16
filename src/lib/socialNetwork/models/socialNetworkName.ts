export enum SocialNetworkName {
    Facebook = 'Facebook',
    Instagram = 'Instagram',
    Phone = 'Phone',
    Email = 'Email',
}
export namespace SocialNetworkName {
    export function getSocialNetworkName(
        name: string | undefined
    ): SocialNetworkName {
        if (name === 'Facebook') {
            return SocialNetworkName.Facebook;
        } else if (name === 'Instagram') {
            return SocialNetworkName.Instagram;
        } else if (name === 'Phone') {
            return SocialNetworkName.Phone;
        } else if (name === 'Email') {
            return SocialNetworkName.Email;
        } else {
            throw new Error(`Unknown social network name: ${name}`);
        }
    }
}
