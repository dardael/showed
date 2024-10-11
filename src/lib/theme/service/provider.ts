import type { Theme } from 'showed/lib/theme/models/theme';
import { Color } from '../models/color';

export default interface Provider {
    createTheme(themeData: {
        color: Color;
        description?: string;
        title?: string;
        isMenuHidden?: boolean;
    }): Promise<Theme>;
    updateTheme(
        id: string,
        update: {
            color: Color;
            description?: string;
            title?: string;
            isMenuHidden?: boolean;
        }
    ): Promise<Theme>;
    getTheme(): Promise<Theme>;
}
