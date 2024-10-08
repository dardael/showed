export enum ComponentType {
    HEADER = 'HEADER',
    HEADER_WITH_COLORED_BACKGROUND = 'HEADER_WITH_COLORED_BACKGROUND',
    UNDERLINED_ABOVELINED_TEXT = 'UNDERLINED_ABOVELINED_TEXT',
    BOLD_TEXT = 'BOLD_TEXT',
    TEXT = 'TEXT',
    RICH_TEXT_EDITOR = 'RICH_TEXT_EDITOR',
    COUNTDOWN = 'COUNTDOWN',
    STAINED_GLASS_PHOTO = 'STAINED_GLASS_PHOTO',
    ROUND_PHOTO = 'ROUND_PHOTO',
    ICON = 'ICON',
    SPACER = 'SPACER',
    CALENDAR_BUTTON = 'CALENDAR_BUTTON',
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
            case ComponentType.HEADER_WITH_COLORED_BACKGROUND:
                return 'Titre avec fond coloré';
            case ComponentType.UNDERLINED_ABOVELINED_TEXT:
                return 'Texte souligné et sur-ligné';
            case ComponentType.BOLD_TEXT:
                return 'Texte en gras';
            case ComponentType.TEXT:
                return 'Texte';
            case ComponentType.STAINED_GLASS_PHOTO:
                return 'Photo vitrail';
            case ComponentType.ROUND_PHOTO:
                return 'Photo ronde';
            case ComponentType.ICON:
                return 'Icône';
            case ComponentType.SPACER:
                return 'Espace vide';
            case ComponentType.CALENDAR_BUTTON:
                return 'Bouton calendrier';
            default:
                throw new Error(`Unknown component type: ${componentType}`);
        }
    }
    export function getAll(): ComponentType[] {
        return [
            ComponentType.BOLD_TEXT,
            ComponentType.COUNTDOWN,
            ComponentType.HEADER,
            ComponentType.HEADER_WITH_COLORED_BACKGROUND,
            ComponentType.RICH_TEXT_EDITOR,
            ComponentType.UNDERLINED_ABOVELINED_TEXT,
            ComponentType.TEXT,
            ComponentType.STAINED_GLASS_PHOTO,
            ComponentType.ROUND_PHOTO,
            ComponentType.ICON,
            ComponentType.SPACER,
            ComponentType.CALENDAR_BUTTON,
        ];
    }
}
