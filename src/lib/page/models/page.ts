import { Block } from './block';

type Page = {
    _id?: string;
    title: string;
    urlPart: string;
    position: number;
    soundId?: string;
    width?: number;
    children?: Block[];
};

function isPage(object: unknown): object is Page {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    return 'title' in object && 'position' in object && 'urlPart' in object;
}

// Export the type separately and maintain compatibility
export type { Page };
export { isPage };
