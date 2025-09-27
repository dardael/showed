import { isValidHexColor } from '../../utils/colorUtils';

const FONT_WEIGHTS = [
    'normal',
    'bold',
    'lighter',
    'bolder',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
] as const;

export type FontWeight = (typeof FONT_WEIGHTS)[number];

export type FontAlignment = 'left' | 'center' | 'right' | 'justify';

type TextBlockProperties = {
    textContent: string;
    fontFamily: string;
    fontWeight: FontWeight;
    fontSize: number;
    alignment: FontAlignment;
    foregroundColor: string;
    backgroundColor: string;
};

function validateFontSize(fontSize: number): boolean {
    return fontSize > 0 && fontSize <= 100; // Reasonable limits
}

function validateColor(color: string): boolean {
    // Allow empty string (transparent) or basic hex color validation
    return isValidHexColor(color);
}

function validateTextBlockProperties(properties: TextBlockProperties): boolean {
    return (
        properties.textContent.length > 0 &&
        properties.fontFamily.length > 0 &&
        FONT_WEIGHTS.includes(properties.fontWeight) &&
        validateFontSize(properties.fontSize) &&
        ['left', 'center', 'right', 'justify'].includes(properties.alignment) &&
        validateColor(properties.foregroundColor) &&
        validateColor(properties.backgroundColor)
    );
}

export type { TextBlockProperties };
export { validateTextBlockProperties };
