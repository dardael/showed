import React, { useEffect, useState } from 'react';
import type { Preview } from '@storybook/react';
import { Providers } from '../src/app/providers';
import getThemeColor from '../src/components/core/theme/color';
import { Color } from '../src/lib/theme/models/color';
import * as ThemeController from '../src/controllers/theme/themeController';
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    decorators: [
        (Story, context) => {
            const [color, setColor] = useState(context.args.color || Color.red);
            useEffect(() => {
                const formData = new FormData();
                formData.append(
                    'color',
                    getThemeColor(context.args.color)[500]
                );
                ThemeController.saveTheme(formData);
                setColor(context.args.color);
            }, [context.args.color]);
            return (
                <Providers initialTheme={{ color: color }}>
                    <Story />
                </Providers>
            );
        },
    ],

    argTypes: {
        color: {
            control: { type: 'select' },
            options: Object.keys(Color),
        },
    },

    args: {
        color: Color.gray,
    },

    loaders: [
        async ({ args }) => {
            return { color: args.color };
        },
    ],

    tags: ['autodocs'],
};

export default preview;
