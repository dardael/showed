'use server';
import getThemeColor from 'showed/components/core/theme/color';
import 'showed/lib/core/dependencyInjection/container';
import { Color } from 'showed/lib/theme/models/color';
import type { Theme } from 'showed/lib/theme/models/theme';
import { WebsiteMode } from 'showed/lib/theme/models/websiteMode';
import Provider from 'showed/lib/theme/provider';
import { Container } from 'typedi';

export async function saveTheme(data: FormData): Promise<Theme> {
    const id = data.get('id')?.toString();
    const hexColor = data.get('color')?.toString();
    if (!hexColor) {
        return await Promise.reject(new Error('Color is required'));
    }
    const provider: Provider = Container.get('ThemeProvider');
    const color = getColorFromHex(hexColor);
    const websiteMode = data.get('websiteMode')?.toString() as WebsiteMode;
    const title = data.get('title')?.toString();
    const description = data.get('description')?.toString();
    const isMenuHidden = Boolean(data.get('isMenuHidden'));
    let updatedTheme;
    if (id) {
        updatedTheme = await provider.updateTheme(id, {
            color,
            websiteMode,
            title,
            description,
            isMenuHidden,
        });
    } else {
        updatedTheme = await provider.createTheme({
            color,
            websiteMode,
            title,
            description,
            isMenuHidden,
        });
    }
    return updatedTheme;
}

export async function getTheme(): Promise<Theme> {
    const provider: Provider = Container.get('ThemeProvider');
    const theme = await provider.getTheme();
    return theme
        ? theme
        : { color: Color.gray, websiteMode: WebsiteMode.ONLINE_STOREFRONT };
}

function getColorFromHex(hex: string): Color {
    return Object.keys(Color).find(
        (color) =>
            getThemeColor(color as Color)[500].toUpperCase() ===
            hex.toUpperCase()
    ) as Color;
}
