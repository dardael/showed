import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import PagesTree from './pagesTree';

import { StoryFn } from '@storybook/nextjs';

export default {
    title: 'components/admin/page/pagesTree',
    component: PagesTree,
};

const Template: StoryFn<typeof PagesTree> = () => (
    <ChakraProvider>
        <PagesTree />
    </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {};
