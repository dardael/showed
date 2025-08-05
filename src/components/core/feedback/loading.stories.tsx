import React from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';
import Loading from './loading';
import { ChakraProvider } from '@chakra-ui/react';

export default {
    title: 'components/core/feedback/loading',
    component: Loading,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <Story />
            </ChakraProvider>
        ),
    ],
    argTypes: {
        isLoading: { control: 'boolean' },
        children: { control: 'text' },
    },
    parameters: {
        layout: 'fullscreen',
    },
} as Meta<typeof Loading>;

const Template: StoryFn<typeof Loading> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
    isLoading: true,
    children: 'Content that is loaded',
};

export const NotLoading = Template.bind({});
NotLoading.args = {
    isLoading: false,
    children: 'Content that is not loading',
};
