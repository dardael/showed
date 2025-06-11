import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import EmailInput from './emailInput';
import { ChakraProvider } from '@chakra-ui/react';

export default {
    title: 'components/core/form/inputs/emailInput',
    component: EmailInput,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <Story />
            </ChakraProvider>
        ),
    ],
    argTypes: {
        placeholder: { control: 'text' },
        isDisabled: { control: 'boolean' },
    },
} as Meta<typeof EmailInput>;

const Template: StoryFn<typeof EmailInput> = (args) => <EmailInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Entrez votre adresse email',
};

export const Invalid = Template.bind({});
Invalid.args = {
    placeholder: 'Entrez votre adresse email',
    value: 'invalid-email',
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Entrez votre adresse email',
    isDisabled: true,
};
