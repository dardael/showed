import 'reflect-metadata';
import MaintainerRepository from 'showed/lib/maintainer/bridge/database/repository';
import MaintainerProvider from 'showed/lib/maintainer/provider';
import SocialNetworkRepository from 'showed/lib/socialNetwork/bridge/database/repository';
import SocialNetworkProvider from 'showed/lib/socialNetwork/provider';
import { container } from 'tsyringe';
import Database from 'showed/lib/core/database/database';

container.register('Database', {
    useClass: Database,
});
container.register('MaintainerRepository', {
    useClass: MaintainerRepository,
});
container.register('MaintainerProvider', {
    useClass: MaintainerProvider,
});
container.register('SocialNetworkRepository', {
    useClass: SocialNetworkRepository,
});
container.register('SocialNetworkProvider', {
    useClass: SocialNetworkProvider,
});
