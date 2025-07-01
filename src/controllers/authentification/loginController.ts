'use server';

import MaintainerProvider from 'showed/lib/maintainer/provider';
import { getService } from '#src/lib/core/dependencyInjection/getter';

interface LoginData {
    email: string;
    password: string;
}

const maintainerProvider: MaintainerProvider = getService('MaintainerProvider');

export async function loginController(data: LoginData): Promise<boolean> {
    return maintainerProvider.loginMaintainer(data.email, data.password);
}
