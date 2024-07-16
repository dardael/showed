import type { Theme } from 'showed/lib/theme/models/theme';
import { Color } from './models/color';
export default interface Repository {
    getTheme(): Promise<Theme>;
    createTheme(themeData: { color: Color }): Promise<Theme>;
    updateTheme(
        id: string,
        themeData: {
            color: Color;
        }
    ): Promise<Theme>;
}
