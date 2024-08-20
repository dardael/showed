export enum ComponentType {
    RICH_TEXT_EDITOR = 'RICH_TEXT_EDITOR',
}
export namespace ComponentType {
    export function getComponentTypeLabel(
        componentType: ComponentType
    ): string {
        if (componentType === ComponentType.RICH_TEXT_EDITOR) {
            return 'Block de texte';
        } else {
            throw new Error(`Unknown component type: ${componentType}`);
        }
    }
}
