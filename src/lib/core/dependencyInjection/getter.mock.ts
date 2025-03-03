import { Color } from 'showed/lib/theme/models/color';
import { WebsiteMode } from 'showed/lib/theme/models/websiteMode';
import { Theme } from 'showed/lib/theme/models/theme';
import { Page } from 'showed/lib/page/models/page';

let theme = { color: Color.gray, websiteMode: WebsiteMode.ONLINE_STOREFRONT };
export const getService = <T>(service: string): T => {
    switch (service) {
        case 'ThemeProvider':
            return {
                createTheme: (themeData: {
                    color: Color;
                    websiteMode: WebsiteMode;
                    description?: string;
                    title?: string;
                    isMenuHidden?: boolean;
                }): Promise<Theme> => {
                    theme = {
                        ...theme,
                        color: themeData.color,
                        websiteMode: themeData.websiteMode,
                    };
                    return Promise.resolve(theme);
                },
                updateTheme: (update: {
                    color: Color;
                    websiteMode: WebsiteMode;
                    description?: string;
                    title?: string;
                    isMenuHidden?: boolean;
                }): Promise<Theme> => {
                    theme = {
                        ...theme,
                        color: update.color,
                        websiteMode: update.websiteMode,
                    };
                    return Promise.resolve(theme);
                },
                getTheme: (): Promise<Theme> => {
                    return Promise.resolve(theme);
                },
            } as T;
        case 'PageProvider':
            return {
                createPage: (pageData: {
                    title: string;
                    position: number;
                }): Promise<Page> => {
                    return Promise.resolve({
                        title: pageData.title,
                        position: pageData.position,
                        urlPart: 'urlPart',
                    } as Page);
                },
                updatePage: (update: {
                    title: string;
                    position: number;
                    width?: number;
                    soundId?: string;
                }): Promise<Page> => {
                    return Promise.resolve({
                        title: update.title,
                        position: update.position,
                        urlPart: 'urlPart',
                    } as Page);
                },
                getPages: (): Promise<Page[]> => {
                    return Promise.resolve([
                        {
                            _id: '1',
                            title: 'title',
                            position: 1,
                            urlPart: 'urlPart',
                        },
                    ] as Page[]);
                },
                deletePage: (): Promise<Page> => {
                    return Promise.resolve({
                        title: 'title',
                        position: 1,
                        urlPart: 'urlPart',
                    } as Page);
                },
                movePage: (): Promise<void> => {
                    return Promise.resolve();
                },
            } as T;
        default:
            throw new Error('Service not found');
    }
};
