'use server';
import 'showed/lib/core/dependencyInjection/container';
import { getService } from 'showed/lib/core/dependencyInjection/getter';
import type { File } from 'showed/lib/file/models/file';
import Provider from 'showed/lib/file/provider';

export async function getFile(id: string): Promise<File | undefined> {
    const provider: Provider = getService('FileProvider');
    return provider.getFile(id);
}
