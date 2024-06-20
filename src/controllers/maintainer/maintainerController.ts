'use server';
import 'showed/lib/core/dependencyInjection/container';
import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';
import Provider from 'showed/lib/maintainer/provider';
import { Container } from 'typedi';

export async function saveMaintainer(data: FormData): Promise<Maintainer> {
    const id = data.get('id')?.toString();
    const email = data.get('email')?.toString();
    const name = data.get('name')?.toString();
    const surname = data.get('surname')?.toString();
    if (!email) {
        return await Promise.reject(new Error('Email is required'));
    }
    const provider: Provider = Container.get('MaintainerProvider');
    let updatedMaintainer;
    if (id) {
        updatedMaintainer = await provider.updateMaintainer(id, {
            email,
            name,
            surname,
        });
    } else {
        updatedMaintainer = await provider.createMaintainer({
            email,
            name,
            surname,
        });
    }
    return updatedMaintainer;
}

export async function getMaintainer(): Promise<Maintainer | undefined> {
    const provider: Provider = Container.get('MaintainerProvider');
    const maintainer = await provider.getMaintainer();
    return maintainer;
}
