import React from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';
import RichTextEditor from './richTextEditor';
import { ChakraProvider } from '@chakra-ui/react';

export default {
    title: 'components/core/input/RichTextEditor',
    component: RichTextEditor,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <Story />
            </ChakraProvider>
        ),
    ],
    argTypes: {
        initialData: { control: 'text' },
        onChange: { action: 'changed' },
    },
    parameters: {
        layout: 'fullscreen',
    },
} as Meta<typeof RichTextEditor>;

const Template: StoryFn<typeof RichTextEditor> = (args) => (
    <RichTextEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
    initialData: 'Enter some text here!',
};
