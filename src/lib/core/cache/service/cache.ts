export default interface Cache {
    get<U>(key: string): U | undefined;
    set<U>(key: string, value: U): void;
}
