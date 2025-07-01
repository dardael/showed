import bcryptjs from 'bcryptjs';
import EncodingProviderInterface from './service/encodingProvider';

export default class EncodingProvider implements EncodingProviderInterface {
    public encodeToBase64(value: string): string {
        return btoa(value);
    }
    public async hashString(value: string): Promise<string> {
        const fixedSalt = '$2a$10$aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        return bcryptjs.hashSync(value, fixedSalt);
    }
}
