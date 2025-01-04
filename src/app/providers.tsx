'use client';

import {
    ChakraProvider,
    extendTheme,
    withDefaultColorScheme,
} from '@chakra-ui/react';
import { Theme } from 'showed/lib/theme/models/theme';
import { createContext, useState } from 'react';
import { Color } from 'showed/lib/theme/models/color';
import { Colors } from 'showed/components/core/theme/color';

export const ThemeContext = createContext({
    theme: { color: Color.gray } as Theme,
    setThemeColor: (color: Color) => {},
    isInvitedToMeal: false,
    setIsInvitedToMeal: (isInvitedToMeal: boolean) => {},
    isInvitedToReception: false,
    setIsInvitedToReception: (isInvitedToReception: boolean) => {},
});
export function Providers({
    children,
    initialTheme,
}: {
    children: React.ReactNode;
    initialTheme: Theme;
}) {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    const [isInvitedToMeal, updateIsInvitedToMeal] = useState(false);
    const [isInvitedToReception, updateIsInvitedToReception] = useState(false);

    function setThemeColor(color: Color) {
        setTheme({ ...theme, color: color });
    }

    function setIsInvitedToMeal(isInvited: boolean) {
        updateIsInvitedToMeal(isInvited);
    }

    function setIsInvitedToReception(isInvited: boolean) {
        updateIsInvitedToReception(isInvited);
    }

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
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setThemeColor,
                isInvitedToMeal,
                setIsInvitedToMeal,
                isInvitedToReception,
                setIsInvitedToReception,
            }}
        >
            <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
        </ThemeContext.Provider>
    );
}
