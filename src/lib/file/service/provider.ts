import type { File } from 'showed/lib/file/models/file';

export default interface Provider {
    createFile(fileData: { filepath: string }): Promise<File>;
    updateFile(id: string, update: { filepath: string }): Promise<File>;
    getFile(id: string): Promise<File | undefined>;
    deleteFile(id: string): Promise<File>;
}
