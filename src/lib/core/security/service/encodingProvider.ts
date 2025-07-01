export default interface EncodingProvider {
    encodeToBase64(value: string): string;
    hashString(value: string): Promise<string>;
}
