import {
    TextBlockProperties,
    validateTextBlockProperties,
} from './textBlockProperties';

class TextBlockComponent {
    private _id: string;
    private _properties: TextBlockProperties;

    constructor(id: string, properties: TextBlockProperties) {
        if (!validateTextBlockProperties(properties)) {
            throw new Error('Invalid TextBlockProperties');
        }
        this._id = id;
        this._properties = { ...properties };
    }

    get id(): string {
        return this._id;
    }

    get properties(): TextBlockProperties {
        return { ...this._properties };
    }

    updateProperties(properties: TextBlockProperties): void {
        if (!validateTextBlockProperties(properties)) {
            throw new Error('Invalid TextBlockProperties');
        }
        this._properties = { ...properties };
    }

    validateProperties(properties: TextBlockProperties): boolean {
        return validateTextBlockProperties(properties);
    }
}

export { TextBlockComponent };
