import 'reflect-metadata';
import Repository from 'showed/lib/maintainer/bridge/database/repository';
import Provider from 'showed/lib/maintainer/provider';
import { container } from 'tsyringe';
import Database from 'showed/lib/core/database/database';

container.register('Database', {
    useClass: Database,
});
container.register('MaintainerRepository', {
    useClass: Repository,
});
container.register('MaintainerProvider', {
    useClass: Provider,
});
