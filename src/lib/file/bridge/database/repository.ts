import { FileModel } from 'showed/lib/file/models/file';
import type { File } from 'showed/lib/file/models/file';
import RepositoryInterface from 'showed/lib/file/repository';
import type Database from 'showed/lib/core/database/service/database';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }
    public async deleteFile(id: string): Promise<File> {
        return this.database.findByIdAndDelete<File>(FileModel, id);
    }
    public async getFiles(filter: any): Promise<File[]> {
        return this.database.find<File>(FileModel, { model: filter });
    }

    public async createFile(fileData: { filepath: string }): Promise<File> {
        return this.database.create<File>(FileModel, fileData);
    }

    public async updateFile(
        id: string,
        fileData: { filepath: string }
    ): Promise<File> {
        return this.database.findByIdAndUpdate<File>(FileModel, id, fileData);
    }
}
