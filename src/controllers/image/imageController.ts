'use server';
import 'showed/lib/core/dependencyInjection/container';
import type { File } from 'showed/lib/file/models/file';
import Provider from 'showed/lib/file/provider';
import { Container } from 'typedi';

export async function getFile(id: string): Promise<File | undefined> {
    const provider: Provider = Container.get('FileProvider');
    return provider.getFile(id);
}
