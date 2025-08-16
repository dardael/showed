import { Color } from 'showed/lib/theme/models/color';
import { WebsiteMode } from 'showed/lib/theme/models/websiteMode';
import { Theme } from 'showed/lib/theme/models/theme';
import { Page } from 'showed/lib/page/models/page';
import { ComponentType } from 'showed/lib/page/models/componentType';
import { Block } from 'showed/lib/page/models/block';
import { Component } from 'showed/lib/page/models/component';
import { BlockType } from 'showed/lib/page/models/blockType';

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
        case 'BlockProvider':
            return {
                updateBlock: (
                    id: string,
                    update: {
                        title: string;
                        position: number;
                        hasTransparentBackground?: boolean;
                        backgroundImageId?: string;
                    }
                ): Promise<Block> => {
                    return Promise.resolve({
                        _id: id,
                        parentBlockId: 'parentBlockId',
                        title: update.title,
                        blockType: BlockType.HORIZONTAL,
                        position: update.position,
                        hasTransparentBackground:
                            update.hasTransparentBackground || false,
                        backgroundImageId: update.backgroundImageId || '',
                    });
                },
            } as T;
        case 'ComponentProvider':
            return {
                updateComponent: (
                    id: string,
                    update: {
                        title: string;
                        position: number;
                        content?: string;
                        componentType?: ComponentType;
                    }
                ): Promise<Component> => {
                    return Promise.resolve({
                        _id: id,
                        blockId: 'parentBlockId',
                        title: update.title,
                        position: update.position,
                        content: update.content || '',
                        componentType: ComponentType.TEXT,
                    });
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
                updatePage: (
                    id: string,
                    update: {
                        title: string;
                        position: number;
                        width?: number;
                        soundId?: string;
                    }
                ): Promise<Page> => {
                    return Promise.resolve({
                        _id: id,
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
                getPagesWithChildren(): Promise<Page[]> {
                    return Promise.resolve([
                        {
                            _id: 'page1',
                            title: 'Page 1',
                            position: 1,
                            urlPart: 'page1',
                            children: [
                                {
                                    _id: 'block1',
                                    pageId: 'page1',
                                    title: 'Block 1',
                                    position: 1,
                                    hasTransparentBackground: false,
                                    blockType: BlockType.VERTICAL,
                                    children: [
                                        {
                                            _id: 'component1',
                                            blockId: 'block1',
                                            componentType: ComponentType.TEXT,
                                            title: 'Component 1',
                                            position: 1,
                                            content: 'coucou',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            _id: 'page2',
                            position: 2,
                            urlPart: 'page2',
                            title: 'Page 2',
                            children: [],
                        },
                    ]);
                },
            } as T;
        case 'MaintainerProvider':
            return {} as T;
        case 'Authentificator':
            return {
                isAlreadyAuthentified: (token: string): Promise<boolean> => {
                    return Promise.resolve(token === 'valid-token');
                },
            } as T;
        case 'FileProvider':
            return {
                getFile: (): Promise<File | undefined> => {
                    return Promise.resolve(undefined);
                },
            } as T;
        default:
            throw new Error('Service not found');
    }
};
