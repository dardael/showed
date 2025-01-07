export default interface Cache {
    get<U>(key: string): U | undefined;
    delete(key: string): void;
    set<U>(key: string, value: U): void;
}
