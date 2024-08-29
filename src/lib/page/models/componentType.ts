export enum ComponentType {
    RICH_TEXT_EDITOR = 'RICH_TEXT_EDITOR',
    COUNTDOWN = 'COUNTDOWN',
}
export namespace ComponentType {
    export function getComponentTypeLabel(
        componentType: ComponentType
    ): string {
        switch (componentType) {
            case ComponentType.RICH_TEXT_EDITOR:
                return 'Block de texte';
            case ComponentType.COUNTDOWN:
                return 'Compte à rebours';
            default:
                throw new Error(`Unknown component type: ${componentType}`);
        }
    }
}
