import type { Theme } from 'showed/lib/theme/models/theme';
import { Color } from '../models/color';
import { WebsiteMode } from '../models/websiteMode';

export default interface Provider {
    createTheme(themeData: {
        color: Color;
        websiteMode: WebsiteMode;
        description?: string;
        title?: string;
        logoImageId?: string;
        isMenuHidden?: boolean;
    }): Promise<Theme>;
    updateTheme(
        id: string,
        update: {
            color: Color;
            websiteMode: WebsiteMode;
            description?: string;
            logoImageId?: string;
            title?: string;
            isMenuHidden?: boolean;
        }
    ): Promise<Theme>;
    getTheme(): Promise<Theme>;
}
