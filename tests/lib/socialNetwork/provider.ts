import Provider from 'showed/lib/socialNetwork/provider';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';
import { expect, it, describe, beforeEach } from '@jest/globals';
import { mock } from 'jest-mock-extended';
import Repository from 'showed/lib/socialNetwork/repository';
import { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
describe('Provider', () => {
    let provider: Provider;
    const repositoryMock = mock<Repository>();
    beforeEach(() => {
        provider = new Provider(repositoryMock);
    });
    describe('createSocialNetwork', () => {
        it('should create a social network', async () => {
            const socialNetworkData = {
                _id: '1',
                text: 'Test',
                name: SocialNetworkName.Facebook,
                link: 'https://facebook.com',
            };
            repositoryMock.createSocialNetwork.mockReturnValue(
                Promise.resolve(socialNetworkData)
            );
            const result =
                await provider.createSocialNetwork(socialNetworkData);
            expect(result).toEqual(socialNetworkData);
        });
    });
    describe('updateSocialNetwork', () => {
        it('should update a social network', async () => {
            const socialNetworkData = {
                _id: '1',
                text: 'Test',
                name: SocialNetworkName.Facebook,
                link: 'https://facebook.com',
            };
            const id = '1';
            repositoryMock.updateSocialNetwork.mockReturnValue(
                Promise.resolve(socialNetworkData)
            );
            const result = await provider.updateSocialNetwork(
                id,
                socialNetworkData
            );
            expect(result).toEqual(socialNetworkData);
        });
    });
    describe('getSocialNetwork', () => {
        it('should get a social network', async () => {
            const socialNetworkData = {
                _id: '1',
                text: 'Test',
                name: SocialNetworkName.Facebook,
                link: 'https://facebook.com',
            };

            repositoryMock.getSocialNetworks.mockReturnValue(
                Promise.resolve([socialNetworkData])
            );
            const result = await provider.getSocialNetwork(
                SocialNetworkName.Facebook
            );
            expect(result).toEqual(socialNetworkData);
        });
    });
    describe('transformPhoneNumberToLink', () => {
        it('should update phone number link', () => {
            const socialNetworkData = {
                name: SocialNetworkName.Phone,
                link: '123 456 7890',
            };

            const result =
                provider['transformPhoneNumberToLink'](socialNetworkData);
            expect(result.link).toEqual('tel:1234567890');
        });
    });

    describe('getSocialNetworks', () => {
        it('should return sorted social networks', async () => {
            const unsortedNetworks: SocialNetwork[] = [
                { name: SocialNetworkName.Phone },
                { name: SocialNetworkName.Contact },
                { name: SocialNetworkName.Facebook },
                { name: SocialNetworkName.Instagram },
            ];
            const sortedNetworks: SocialNetwork[] = [
                { name: SocialNetworkName.Facebook },
                { name: SocialNetworkName.Instagram },
                { name: SocialNetworkName.Phone },
                { name: SocialNetworkName.Contact },
            ];
            repositoryMock.getSocialNetworks.mockReturnValue(
                Promise.resolve(unsortedNetworks)
            );

            const result = await provider.getSocialNetworks();

            expect(result).toEqual(sortedNetworks);
        });
    });

    describe('sortSocialNetworks', () => {
        it('should sort social networks correctly', () => {
            const unsortedNetworks: SocialNetwork[] = [
                { name: SocialNetworkName.Phone },
                { name: SocialNetworkName.Contact },
                { name: SocialNetworkName.Facebook },
                { name: SocialNetworkName.Instagram },
            ];
            const sortedNetworks: SocialNetwork[] = [
                { name: SocialNetworkName.Facebook },
                { name: SocialNetworkName.Instagram },
                { name: SocialNetworkName.Phone },
                { name: SocialNetworkName.Contact },
            ];

            const result = (provider as any).sortSocialNetworks(
                unsortedNetworks
            );

            expect(result).toEqual(sortedNetworks);
        });
    });

    describe('transformLinkToPhoneNumberIfNecessary', () => {
        it('should remove "tel:" from the link if the social network is Phone', () => {
            const socialNetwork = {
                name: SocialNetworkName.Phone,
                link: 'tel:1234567890',
            };

            const result =
                provider['transformLinkToPhoneNumberIfNecessary'](
                    socialNetwork
                );

            expect(result).toEqual({
                name: SocialNetworkName.Phone,
                link: '1234567890',
            });
        });

        it('should not modify the link if the social network is not Phone', () => {
            const socialNetwork = {
                name: SocialNetworkName.Facebook,
                link: 'https://facebook.com',
            };

            const result =
                provider['transformLinkToPhoneNumberIfNecessary'](
                    socialNetwork
                );

            expect(result).toEqual(socialNetwork);
        });
    });
});
