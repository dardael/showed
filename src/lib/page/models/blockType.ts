export enum BlockType {
    HORIZONTAL = 'HORIZONTAL',
    LINKED = 'LINKED',
}
export namespace BlockType {
    export function getBlockTypeLabel(blockType: BlockType): string {
        switch (blockType) {
            case BlockType.HORIZONTAL:
                return 'Block horizontal';
            case BlockType.LINKED:
                return 'Block lié';
            default:
                throw new Error(`Unknown block type: ${blockType}`);
        }
    }
    export function getAll(): BlockType[] {
        return [BlockType.HORIZONTAL, BlockType.LINKED];
    }
}
