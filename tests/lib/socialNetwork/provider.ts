import Provider from 'showed/lib/socialNetwork/provider';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';
import { expect, it, describe, beforeEach } from '@jest/globals';
import { mock } from 'jest-mock-extended';
import Repository from 'showed/lib/socialNetwork/repository';
describe('Provider', () => {
    let provider: Provider;
    const repositoryMock = mock<Repository>();
    beforeEach(() => {
        provider = new Provider(repositoryMock);
    });

    it('should create a social network', async () => {
        const socialNetworkData = {
            id: '1',
            _id: '1',
            text: 'Test',
            name: SocialNetworkName.Facebook,
            link: 'https://facebook.com',
        };
        repositoryMock.createSocialNetwork.mockReturnValue(
            Promise.resolve(socialNetworkData)
        );
        const result = await provider.createSocialNetwork(socialNetworkData);
        expect(result).toEqual(socialNetworkData);
    });

    it('should update a social network', async () => {
        const socialNetworkData = {
            id: '1',
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

    it('should get a social network', async () => {
        const socialNetworkData = {
            id: '1',
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

    it('should update phone number link', () => {
        const socialNetworkData = {
            name: SocialNetworkName.Phone,
            link: '123 456 7890',
        };

        const result = provider['updatePhoneNumberLink'](socialNetworkData);
        expect(result.link).toEqual('tel:1234567890');
    });

    it('should parse phone number link', () => {
        const link = 'tel:1234567890';

        const result = provider['getParsedPhoneNumberLink'](link);
        expect(result).toEqual('1234567890');
    });
});
