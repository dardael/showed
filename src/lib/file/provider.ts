import ProviderInterface from 'showed/lib/file/service/provider';
import type Repository from 'showed/lib/file/repository';
import type { File } from 'showed/lib/file/models/file';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }
    public async deleteFile(id: string): Promise<File> {
        return this.repository.deleteFile(id);
    }
    public async createFile(fileData: { filepath: string }): Promise<File> {
        return this.repository.createFile(fileData);
    }

    public async updateFile(
        id: string,
        update: { filepath: string }
    ): Promise<File> {
        return this.repository.updateFile(id, update);
    }
    public async getFile(id: string): Promise<File | undefined> {
        const files = await this.repository.getFiles({ _id: id });
        return files?.pop();
    }
}
