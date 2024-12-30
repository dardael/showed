export enum BlockType {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
    LINKED = 'LINKED',
    INVITATION = 'INVITATION',
}
export namespace BlockType {
    export function getBlockTypeLabel(blockType: BlockType): string {
        switch (blockType) {
            case BlockType.VERTICAL:
                return 'Block vertical';
            case BlockType.HORIZONTAL:
                return 'Block horizontal';
            case BlockType.LINKED:
                return 'Block lié';
            case BlockType.INVITATION:
                return 'Invitations';
            default:
                throw new Error(`Unknown block type: ${blockType}`);
        }
    }
}
