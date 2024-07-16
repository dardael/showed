'use client';

import {
    ChakraProvider,
    extendTheme,
    withDefaultColorScheme,
} from '@chakra-ui/react';
import { Theme } from 'showed/lib/theme/models/theme';
import { createContext, useEffect, useState } from 'react';
import { Color } from 'showed/lib/theme/models/color';
import { Colors } from 'showed/components/core/theme/color';
import { getTheme, saveTheme } from 'showed/controllers/theme/themeController';

export const ThemeContext = createContext({
    theme: { color: Color.gray } as Theme,
    setThemeColor: (color: Color) => {},
});
export function Providers({
    children,
    initialTheme,
}: {
    children: React.ReactNode;
    initialTheme: Theme;
}) {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    function setThemeColor(color: Color) {
        setTheme({ ...theme, color: color });
    }
    const chakraTheme = extendTheme(
        withDefaultColorScheme({ colorScheme: theme?.color }),
        {
            colors: {
                Colors,
            },
        }
    );
    return (
        <ThemeContext.Provider value={{ theme, setThemeColor }}>
            <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
        </ThemeContext.Provider>
    );
}
