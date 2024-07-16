import type { Theme } from 'showed/lib/theme/models/theme';
import { Color } from '../models/color';

export default interface Provider {
    createTheme(themeData: { color: Color }): Promise<Theme>;
    updateTheme(id: string, update: { color: Color }): Promise<Theme>;
    getTheme(): Promise<Theme>;
}
