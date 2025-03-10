'use client';

import {
    ChakraProvider,
    extendTheme,
    withDefaultColorScheme,
} from '@chakra-ui/react';
import { Theme } from 'showed/lib/theme/models/theme';
import { createContext, useContext, useEffect, useState } from 'react';
import { Color } from 'showed/lib/theme/models/color';
import { Colors } from 'showed/components/core/theme/color';

export const ThemeContext = createContext<{
    theme: Theme;
    setThemeColor: (color: Color) => void;
}>({
    theme: { color: Color.gray } as Theme,
    setThemeColor: () => {},
});
export function Providers({
    children,
    initialTheme,
}: {
    children: React.ReactNode;
    initialTheme: Theme;
}) {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const setThemeColor = (color: Color) => {
        setTheme({ ...theme, color: color });
    };

    const chakraTheme = extendTheme(
        withDefaultColorScheme({ colorScheme: theme?.color }),
        {
            colors: {
                Colors,
            },

            initialColorMode: 'light',
            useSystemColorMode: false,
        }
    );
    useEffect(
        () => setTheme({ ...theme, color: initialTheme.color }),
        [initialTheme]
    );
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setThemeColor,
            }}
        >
            <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
        </ThemeContext.Provider>
    );
}
export const useGlobalContext = () => useContext(ThemeContext);
