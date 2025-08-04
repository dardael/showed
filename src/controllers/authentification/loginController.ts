'use server';

import MaintainerProvider from 'showed/lib/maintainer/service/provider';
import Authentificator from 'showed/lib/core/authentification/service/authentificator';
import { getService } from '#src/lib/core/dependencyInjection/getter';

interface LoginData {
    email: string;
    password: string;
    token: string;
}

const maintainerProvider: MaintainerProvider = getService('MaintainerProvider');
const authentificator: Authentificator = getService('Authentificator');

export async function login(data: LoginData): Promise<void> {
    const isLoginOk = await maintainerProvider.loginMaintainer(
        data.email,
        data.password,
        data.token
    );
    if (!isLoginOk) {
        throw new Error('Login failed');
    }
}

export async function isAlreadyAuthentified(token: string): Promise<boolean> {
    return authentificator.isAlreadyAuthentified(token);
}

export async function logout(token: string): Promise<void> {
    return authentificator.logout(token);
}
