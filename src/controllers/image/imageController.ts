'use server';
import { getService } from '#src/lib/core/dependencyInjection/getter';
import type { File } from 'showed/lib/file/models/file';
import Provider from 'showed/lib/file/provider';

export async function getFile(id: string): Promise<File | undefined> {
    const provider: Provider = getService('FileProvider');
    return provider.getFile(id);
}
