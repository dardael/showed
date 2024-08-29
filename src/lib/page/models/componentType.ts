export enum ComponentType {
    HEADER = 'HEADER',
    BOLD_TEXT = 'BOLD_TEXT',
    TEXT = 'TEXT',
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
            case ComponentType.HEADER:
                return 'Titre';
            case ComponentType.BOLD_TEXT:
                return 'Texte en gras';
            case ComponentType.TEXT:
                return 'Texte';
            default:
                throw new Error(`Unknown component type: ${componentType}`);
        }
    }
    export function getAll(): ComponentType[] {
        return [
            ComponentType.BOLD_TEXT,
            ComponentType.COUNTDOWN,
            ComponentType.HEADER,
            ComponentType.RICH_TEXT_EDITOR,
            ComponentType.TEXT,
        ];
    }
}
