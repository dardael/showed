import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    features: {
        experimentalRSC: true,
    },
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        //'@chromatic-com/storybook',
        //'@storybook/addon-interactions',
        //'@storybook/nextjs',
        //'@storybook/addon-jest',
        //'storybook-addon-module-mock'
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    staticDirs: ['../public'],
    docs: {
        autodocs: true,
    },
};
export default config;
