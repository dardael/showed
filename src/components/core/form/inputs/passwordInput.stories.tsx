import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PasswordInput from './passwordInput';
import { ChakraProvider } from '@chakra-ui/react';

export default {
    title: 'components/core/form/inputs/passwordInput',
    component: PasswordInput,
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
        isInvalid: { control: 'boolean' },
    },
} as Meta<typeof PasswordInput>;

const Template: StoryFn<typeof PasswordInput> = (args) => (
    <PasswordInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Entrez votre mot de passe',
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Entrez votre mot de passe',
    isDisabled: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
    placeholder: 'Entrez votre mot de passe',
    value: '123456',
};
