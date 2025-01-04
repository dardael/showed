'use server';

import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function getSessionId(
    setSessionIdIfNeeded: boolean = false
): Promise<string | undefined> {
    let sessionId = cookies().get('sessionId')?.value;
    if (!sessionId && setSessionIdIfNeeded) {
        sessionId = nanoid();
        cookies().set('sessionId', sessionId);
    }
    return sessionId;
}
