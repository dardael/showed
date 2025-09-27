import { validateTextBlockProperties } from '../../../src/lib/page/models/textBlockProperties';
import type { TextBlockProperties } from '../../../src/lib/page/models/textBlockProperties';

describe('TextBlockProperties', () => {
    describe('validateTextBlockProperties', () => {
        it('should validate valid properties', () => {
            const properties = {
                textContent: 'Hello World',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };
            expect(validateTextBlockProperties(properties)).toBe(true);
        });

        it('should validate properties with transparent colors', () => {
            const properties = {
                textContent: 'Hello World',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '',
                backgroundColor: '',
            };
            expect(validateTextBlockProperties(properties)).toBe(true);
        });

        it('should invalidate empty text content', () => {
            const properties = {
                textContent: '',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };
            expect(validateTextBlockProperties(properties)).toBe(false);
        });

        it('should invalidate invalid font size', () => {
            const properties = {
                textContent: 'Hello',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 0,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };
            expect(validateTextBlockProperties(properties)).toBe(false);
        });

        it('should invalidate invalid color', () => {
            const properties = {
                textContent: 'Hello',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: 'invalid',
                backgroundColor: '#FFFFFF',
            };
            expect(validateTextBlockProperties(properties)).toBe(false);
        });

        it('should invalidate invalid alignment', () => {
            const properties = {
                textContent: 'Hello',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'invalid',
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            } as unknown as TextBlockProperties;
            expect(validateTextBlockProperties(properties)).toBe(false);
        });
    });
});
