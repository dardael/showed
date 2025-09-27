import { isValidHexColor } from '../../../src/lib/utils/colorUtils';

describe('isValidHexColor', () => {
    it('should return true for empty string', () => {
        expect(isValidHexColor('')).toBe(true);
    });

    it('should return true for valid hex colors', () => {
        expect(isValidHexColor('#FFFFFF')).toBe(true);
        expect(isValidHexColor('#000000')).toBe(true);
        expect(isValidHexColor('#FF0000')).toBe(true);
        expect(isValidHexColor('#00FF00')).toBe(true);
        expect(isValidHexColor('#0000FF')).toBe(true);
        expect(isValidHexColor('#123456')).toBe(true);
        expect(isValidHexColor('#abcdef')).toBe(true);
        expect(isValidHexColor('#ABCDEF')).toBe(true);
    });

    it('should return false for invalid hex colors', () => {
        expect(isValidHexColor('#FFFFF')).toBe(false); // 5 characters
        expect(isValidHexColor('#FFFFFF1')).toBe(false); // 7 characters
        expect(isValidHexColor('#GGG')).toBe(false); // invalid characters
        expect(isValidHexColor('#12345')).toBe(false); // 5 characters
        expect(isValidHexColor('FFFFFF')).toBe(false); // no #
        expect(isValidHexColor('#123')).toBe(false); // 3 characters
        expect(isValidHexColor('#1234567')).toBe(false); // 7 characters
    });
});
