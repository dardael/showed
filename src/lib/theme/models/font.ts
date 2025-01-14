export enum Font {
    ROBOTO_FLEX = 'ROBOTO_FLEX',
    ADVENT_PRO = 'ADVENT_PRO',
}
export function getFontLabel(font: Font): string {
    switch (font) {
        case Font.ROBOTO_FLEX:
            return 'Roboto Flex';
        case Font.ADVENT_PRO:
            return 'Advent Pro';
        default:
            throw new Error(`Unknown font: ${font}`);
    }
}
export function getAll(): Font[] {
    return [Font.ADVENT_PRO, Font.ROBOTO_FLEX];
}
