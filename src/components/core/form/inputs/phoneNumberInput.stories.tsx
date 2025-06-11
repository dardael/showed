import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PhoneNumberInput from './phoneNumberInput';
import { ChakraProvider } from '@chakra-ui/react';

export default {
    title: 'components/core/form/inputs/phoneNumberInput',
    component: PhoneNumberInput,
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
} as Meta<typeof PhoneNumberInput>;

const Template: StoryFn<typeof PhoneNumberInput> = (args) => (
    <PhoneNumberInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Enter your phone number',
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Enter your phone number',
    isDisabled: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
    placeholder: 'Enter your phone number',
    isInvalid: true,
};
