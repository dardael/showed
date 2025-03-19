import ProviderInterface from 'showed/lib/file/service/provider';
import type Repository from 'showed/lib/file/repository';
import type { File } from 'showed/lib/file/models/file';
import fs from 'fs';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }
    public async deleteFile(id: string): Promise<File> {
        const file = await this.getFile(id);
        if (!file) {
            throw new Error(`File with id ${id} not found`);
        }
        if (fs.existsSync(file.filepath)) {
            fs.unlinkSync(file.filepath);
        }
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
        const files = await this.repository.getFiles(id);
        return files?.pop();
    }
}
