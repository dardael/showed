export enum BlockType {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
    LINKED = 'LINKED',
    INVITATION = 'INVITATION',
    PRODUCTS = 'PRODUCTS',
}
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
        case BlockType.PRODUCTS:
            return 'Produits';
        default:
            throw new Error(`Unknown block type: ${blockType}`);
    }
}
