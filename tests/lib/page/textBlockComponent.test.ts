import { TextBlockComponent } from '../../../src/lib/page/models/textBlockComponent';
import type { TextBlockProperties } from '../../../src/lib/page/models/textBlockProperties';

describe('TextBlockComponent', () => {
    const validProperties = {
        textContent: 'Hello World',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 16,
        alignment: 'center',
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
    };

    it('should create a TextBlockComponent with valid properties', () => {
        const component = new TextBlockComponent('id1', validProperties as any);
        expect(component.id).toBe('id1');
        expect(component.properties).toEqual(validProperties);
    });

    it('should throw error with invalid properties', () => {
        const invalidProperties = { ...validProperties, textContent: '' };
        expect(
            () => new TextBlockComponent('id1', invalidProperties as any)
        ).toThrow('Invalid TextBlockProperties');
    });

    it('should update properties', () => {
        const component = new TextBlockComponent('id1', validProperties as any);
        const newProperties = { ...validProperties, textContent: 'Updated' };
        component.updateProperties(newProperties as any);
        expect(component.properties.textContent).toBe('Updated');
    });

    it('should throw error when updating with invalid properties', () => {
        const component = new TextBlockComponent('id1', validProperties as any);
        const invalidProperties = { ...validProperties, fontSize: 0 };
        expect(() =>
            component.updateProperties(invalidProperties as any)
        ).toThrow('Invalid TextBlockProperties');
    });

    it('should validate properties', () => {
        const component = new TextBlockComponent('id1', validProperties as any);
        expect(component.validateProperties(validProperties as any)).toBe(true);
        expect(
            component.validateProperties({
                ...validProperties,
                textContent: '',
            } as any)
        ).toBe(false);
    });
});
