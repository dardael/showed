export default interface Authentificator {
    isAlreadyAuthentified(token: string): Promise<boolean>;
    saveAuthentification(token: string): Promise<void>;
    logout(token: string): Promise<void>;
}
