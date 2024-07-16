import FileRepository from 'showed/lib/file/bridge/database/repository';
import FileProvider from 'showed/lib/file/provider';
import ThemeRepository from 'showed/lib/theme/bridge/database/repository';
import ThemeProvider from 'showed/lib/theme/provider';
import MaintainerRepository from 'showed/lib/maintainer/bridge/database/repository';
import MaintainerProvider from 'showed/lib/maintainer/provider';
import PageRepository from 'showed/lib/page/bridge/database/repository';
import PageProvider from 'showed/lib/page/provider';
import SocialNetworkRepository from 'showed/lib/socialNetwork/bridge/database/repository';
import SocialNetworkProvider from 'showed/lib/socialNetwork/provider';
import { Container } from 'typedi';
import Database from 'showed/lib/core/database/database';

const database = new Database();
const databaseToken = 'Database';
Container.set(databaseToken, database);

const fileRepository = new FileRepository(database);
const fileRepositoryToken = 'FileRepository';
Container.set(fileRepositoryToken, fileRepository);

const fileProvider = new FileProvider(fileRepository);
const fileProviderToken = 'FileProvider';
Container.set(fileProviderToken, fileProvider);

const themeRepository = new ThemeRepository(database);
const themeRepositoryToken = 'ThemeRepository';
Container.set(themeRepositoryToken, themeRepository);

const themeProvider = new ThemeProvider(themeRepository);
const themeProviderToken = 'ThemeProvider';
Container.set(themeProviderToken, themeProvider);

const maintainerRepository = new MaintainerRepository(database);
const maintainerRepositoryToken = 'MaintainerRepository';
Container.set(maintainerRepositoryToken, maintainerRepository);

const maintainerProvider = new MaintainerProvider(maintainerRepository);
const maintainerProviderToken = 'MaintainerProvider';
Container.set(maintainerProviderToken, maintainerProvider);

const pageRepository = new PageRepository(database);
const pageRepositoryToken = 'PageRepository';
Container.set(pageRepositoryToken, pageRepository);

const pageProvider = new PageProvider(pageRepository);
const pageProviderToken = 'PageProvider';
Container.set(pageProviderToken, pageProvider);

const socialNetworkRepository = new SocialNetworkRepository(database);
const socialNetworkRepositoryToken = 'SocialNetworkRepository';
Container.set(socialNetworkRepositoryToken, socialNetworkRepository);

const socialNetworkProvider = new SocialNetworkProvider(
    socialNetworkRepository
);
const socialNetworkProviderToken = 'SocialNetworkProvider';
Container.set(socialNetworkProviderToken, socialNetworkProvider);
