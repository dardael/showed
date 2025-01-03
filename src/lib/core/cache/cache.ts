import { Error } from 'mongoose';
import { cookies } from 'next/headers';
import NodeCache from 'node-cache';
import CacheInterface from 'showed/lib/core/cache/service/cache';

export default class Cache implements CacheInterface {
    private userCache: NodeCache;
    constructor() {
        this.userCache = new NodeCache();
    }
    public get<U>(key: string): U | undefined {
        return this.userCache.get<U>(this.getCacheKey(key));
    }
    public set<U>(key: string, value: U): void {
        this.userCache.set<U>(this.getCacheKey(key), value);
    }

    private getCacheKey(key: string): string {
        const sessionId = cookies().get('sessionId')?.value;
        if (!sessionId) {
            throw new Error('SessionId is unavailable');
        }
        return sessionId + key;
    }
}
