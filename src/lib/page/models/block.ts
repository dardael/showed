import { BlockType } from './blockType';
import { Component } from './component';
type Block = {
    _id?: string;
    pageId?: string;
    backgroundImageId?: string;
    title: string;
    position: number;
    parentBlockId?: string;
    hasTransparentBackground: boolean;
    blockType: BlockType;
    isVisibleOnlyWhenInvitedToReception?: boolean;
    isVisibleOnlyWhenInvitedToMeal?: boolean;
    isVisibleOnlyWhenInvitedToTownHall?: boolean;
    children?: (Block | Component)[];
};
function isBlock(object: unknown): object is Block {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    return (
        ('parentBlockId' in object || 'pageId' in object) &&
        'position' in object &&
        'hasTransparentBackground' in object &&
        'title' in object
    );
}

export { isBlock };
export type { Block };
