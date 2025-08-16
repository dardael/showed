import React from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';
import Tree from './tree';
import { ChakraProvider } from '@chakra-ui/react';

export default {
    title: 'components/core/tree',
    component: Tree,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <Story />
            </ChakraProvider>
        ),
    ],
    argTypes: {},
    parameters: {
        layout: 'fullscreen',
    },
} as Meta<typeof Tree>;

const Template: StoryFn<typeof Tree> = (args) => {
    return <Tree {...args} data={args.data} />;
};

export const Default = Template.bind({});
Default.args = {
    data: [
        {
            id: '1',
            label: 'Parent 1',
            children: [
                { id: '1-1', label: 'Child 1-1' },
                { id: '1-2', label: 'Child 1-2' },
            ],
        },
        {
            id: '2',
            label: 'Parent 2',
        },
    ],
};

// Removed WithReorder story as it tested drag-and-drop functionality

export const WithNodeClick = Template.bind({});
WithNodeClick.args = {
    data: [
        {
            id: '1',
            label: 'Parent 1',
            children: [
                { id: '1-1', label: 'Child 1-1' },
                { id: '1-2', label: 'Child 1-2' },
            ],
        },
        {
            id: '2',
            label: 'Parent 2',
        },
    ],
    onNodeClick: (node) => alert(`Clicked on node: ${node.label}`),
};
