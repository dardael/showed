'use server';
import getThemeColor from 'showed/components/core/theme/color';
import 'showed/lib/core/dependencyInjection/container';
import { Color } from 'showed/lib/theme/models/color';
import type { Theme } from 'showed/lib/theme/models/theme';
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
    console.log(color);
    let updatedTheme;
    if (id) {
        updatedTheme = await provider.updateTheme(id, {
            color,
        });
    } else {
        updatedTheme = await provider.createTheme({
            color,
        });
    }
    return updatedTheme;
}

export async function getTheme(): Promise<Theme> {
    const provider: Provider = Container.get('ThemeProvider');
    const theme = await provider.getTheme();
    return theme ? theme : { color: Color.gray };
}

function getColorFromHex(hex: string): Color {
    return Object.keys(Color).find(
        (color) =>
            getThemeColor(color as Color)[500].toUpperCase() ===
            hex.toUpperCase()
    ) as Color;
}
