import { Meta, StoryObj } from '@storybook/react/*';
import Header from './header';
import { Font } from 'showed/lib/theme/models/font';

const meta: Meta<typeof Header> = {
    component: Header,
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
    args: {
        text: "it's a header",
    },
    argTypes: {
        text: {
            control: 'text',
        },
        font: {
            options: Object.keys(Font),
        },
    },
};
