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
        return this.userCache.get<U>(key);
    }
    public set<U>(key: string, value: U): void {
        this.userCache.set<U>(key, value);
    }
}
