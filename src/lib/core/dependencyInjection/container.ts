import FileRepository from 'showed/lib/file/bridge/database/repository';
import FileProvider from 'showed/lib/file/provider';
import ThemeRepository from 'showed/lib/theme/bridge/database/repository';
import ThemeProvider from 'showed/lib/theme/provider';
import MaintainerRepository from 'showed/lib/maintainer/bridge/database/repository';
import MaintainerProvider from 'showed/lib/maintainer/provider';
import PageRepository from 'showed/lib/page/bridge/database/pageRepository';
import PersonRepository from 'showed/lib/invitation/bridge/database/personRepository';
import ProductRepository from 'showed/lib/product/bridge/database/productRepository';
import OrderRepository from 'showed/lib/product/bridge/database/orderRepository';
import ComponentRepository from 'showed/lib/page/bridge/database/componentRepository';
import BlockRepository from 'showed/lib/page/bridge/database/blockRepository';
import PageProvider from 'showed/lib/page/pageProvider';
import PersonProvider from 'showed/lib/invitation/personProvider';
import ProductProvider from 'showed/lib/product/productProvider';
import OrderProvider from 'showed/lib/product/orderProvider';
import ShoppingCartProvider from 'showed/lib/product/shoppingCartProvider';
import ComponentProvider from 'showed/lib/page/componentProvider';
import BlockProvider from 'showed/lib/page/blockProvider';
import SocialNetworkRepository from 'showed/lib/socialNetwork/bridge/database/repository';
import SocialNetworkProvider from 'showed/lib/socialNetwork/provider';
import EncodingProvider from 'showed/lib/core/security/encodingProvider';
import Cache from 'showed/lib/core/cache/cache';
import Authentificator from 'showed/lib/core/authentification/authentificator';
import AuthentificatorRepository from 'showed/lib/core/authentification/bridge/database/repository';
import { Container } from 'typedi';
import Database from 'showed/lib/core/database/database';

const database = new Database();
const databaseToken = 'Database';
Container.set(databaseToken, database);

const authentificatorRepository = new AuthentificatorRepository(database);
const authentificatorRepositoryToken = 'AuthentificatorRepository';
Container.set(authentificatorRepositoryToken, authentificatorRepository);

const authentificator = new Authentificator(authentificatorRepository);
const authentificatorToken = 'Authentificator';
Container.set(authentificatorToken, authentificator);

const cache = new Cache();
const cacheToken = 'Cache';
Container.set(cacheToken, cache);

const encodingProvider = new EncodingProvider();
const encodingProviderToken = 'Encoding';
Container.set(encodingProviderToken, encodingProvider);

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

const maintainerProvider = new MaintainerProvider(
    maintainerRepository,
    encodingProvider,
    authentificator
);
const maintainerProviderToken = 'MaintainerProvider';
Container.set(maintainerProviderToken, maintainerProvider);

const pageRepository = new PageRepository(database);
const pageRepositoryToken = 'PageRepository';
Container.set(pageRepositoryToken, pageRepository);

const componentRepository = new ComponentRepository(database);
const componentRepositoryToken = 'ComponentRepository';
Container.set(componentRepositoryToken, componentRepository);

const blockRepository = new BlockRepository(database, componentRepository);
const blockRepositoryToken = 'BlockRepository';
Container.set(blockRepositoryToken, blockRepository);

const personRepository = new PersonRepository(database);
const personRepositoryToken = 'PersonRepository';
Container.set(personRepositoryToken, personRepository);

const pageProvider = new PageProvider(
    pageRepository,
    blockRepository,
    fileProvider
);
const pageProviderToken = 'PageProvider';
Container.set(pageProviderToken, pageProvider);

const productRepository = new ProductRepository(database);
const productRepositoryToken = 'ProductRepository';
Container.set(productRepositoryToken, productRepository);

const productProvider = new ProductProvider(productRepository, fileProvider);
const productProviderToken = 'ProductProvider';
Container.set(productProviderToken, productProvider);

const shoppingCartProvider = new ShoppingCartProvider(cache);
const shoppingCartProviderToken = 'ShoppingCartProvider';
Container.set(shoppingCartProviderToken, shoppingCartProvider);

const orderRepository = new OrderRepository(database);
const orderRepositoryToken = 'OrderRepository';
Container.set(orderRepositoryToken, orderRepository);

const orderProvider = new OrderProvider(orderRepository, shoppingCartProvider);
const orderProviderToken = 'OrderProvider';
Container.set(orderProviderToken, orderProvider);

const blockProvider = new BlockProvider(blockRepository, componentRepository);
const blockProviderToken = 'BlockProvider';
Container.set(blockProviderToken, blockProvider);

const componentProvider = new ComponentProvider(componentRepository);
const componentProviderToken = 'ComponentProvider';
Container.set(componentProviderToken, componentProvider);

const personProvider = new PersonProvider(personRepository, cache);
const personProviderToken = 'PersonProvider';
Container.set(personProviderToken, personProvider);

const socialNetworkRepository = new SocialNetworkRepository(database);
const socialNetworkRepositoryToken = 'SocialNetworkRepository';
Container.set(socialNetworkRepositoryToken, socialNetworkRepository);

const socialNetworkProvider = new SocialNetworkProvider(
    socialNetworkRepository
);
const socialNetworkProviderToken = 'SocialNetworkProvider';
Container.set(socialNetworkProviderToken, socialNetworkProvider);
