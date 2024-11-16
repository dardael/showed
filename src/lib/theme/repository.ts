import type { Theme } from 'showed/lib/theme/models/theme';
import { Color } from './models/color';
import { WebsiteMode } from './models/websiteMode';
export default interface Repository {
    getTheme(): Promise<Theme>;
    createTheme(themeData: {
        color: Color;
        websiteMode: WebsiteMode;
        title?: string;
        description?: string;
        isMenuHidden?: boolean;
    }): Promise<Theme>;
    updateTheme(
        id: string,
        themeData: {
            websiteMode: WebsiteMode;
            color: Color;
            title?: string;
            description?: string;
            isMenuHidden?: boolean;
        }
    ): Promise<Theme>;
}
