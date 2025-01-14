import type { File } from 'showed/lib/file/models/file';
export default interface Repository {
    getFiles(id: string): Promise<File[]>;
    createFile(fileData: { filepath: string }): Promise<File>;
    updateFile(id: string, fileData: { filepath: string }): Promise<File>;
    deleteFile(id: string): Promise<File>;
}
