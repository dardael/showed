'use server';

import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function getSessionId(): Promise<string> {
    const sessionId = cookies().get('sessionId')?.value;
    if (!sessionId) {
        cookies().set('sessionId', nanoid());
    }
    return cookies().get('sessionId')?.value as string;
}
