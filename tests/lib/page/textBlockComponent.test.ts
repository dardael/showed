import { TextBlockComponent } from '../../../src/lib/page/models/textBlockComponent';

describe('TextBlockComponent', () => {
    const validProperties = {
        textContent: 'Hello World',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 16,
        alignment: 'center' as const,
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
    };

    it('should create a TextBlockComponent with valid properties', () => {
        const component = new TextBlockComponent('id1', validProperties);
        expect(component.id).toBe('id1');
        expect(component.properties).toEqual(validProperties);
    });

    it('should throw error with invalid properties', () => {
        const invalidProperties = { ...validProperties, textContent: '' };
        expect(() => new TextBlockComponent('id1', invalidProperties)).toThrow(
            'Invalid TextBlockProperties'
        );
    });

    it('should update properties', () => {
        const component = new TextBlockComponent('id1', validProperties);
        const newProperties = { ...validProperties, textContent: 'Updated' };
        component.updateProperties(newProperties);
        expect(component.properties.textContent).toBe('Updated');
    });

    it('should throw error when updating with invalid properties', () => {
        const component = new TextBlockComponent('id1', validProperties);
        const invalidProperties = { ...validProperties, fontSize: 0 };
        expect(() => component.updateProperties(invalidProperties)).toThrow(
            'Invalid TextBlockProperties'
        );
    });

    it('should validate properties', () => {
        const component = new TextBlockComponent('id1', validProperties);
        expect(component.validateProperties(validProperties)).toBe(true);
        expect(
            component.validateProperties({
                ...validProperties,
                textContent: '',
            })
        ).toBe(false);
    });
});
