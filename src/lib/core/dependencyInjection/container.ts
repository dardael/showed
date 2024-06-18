import MaintainerRepository from 'showed/lib/maintainer/bridge/database/repository';
import MaintainerProvider from 'showed/lib/maintainer/provider';
import SocialNetworkRepository from 'showed/lib/socialNetwork/bridge/database/repository';
import SocialNetworkProvider from 'showed/lib/socialNetwork/provider';
import { Container } from 'typedi';
import Database from 'showed/lib/core/database/database';

const database = new Database();
const databaseToken = 'Database';
Container.set(databaseToken, database);

const maintainerRepository = new MaintainerRepository(database);
const maintainerRepositoryToken = 'MaintainerRepository';
Container.set(maintainerRepositoryToken, maintainerRepository);

const maintainerProvider = new MaintainerProvider(maintainerRepository);
const maintainerProviderToken = 'MaintainerProvider';
Container.set(maintainerProviderToken, maintainerProvider);

const socialNetworkRepository = new SocialNetworkRepository(database);
const socialNetworkRepositoryToken = 'SocialNetworkRepository';
Container.set(socialNetworkRepositoryToken, socialNetworkRepository);

const socialNetworkProvider = new SocialNetworkProvider(
    socialNetworkRepository
);
const socialNetworkProviderToken = 'SocialNetworkProvider';
Container.set(socialNetworkProviderToken, socialNetworkProvider);
