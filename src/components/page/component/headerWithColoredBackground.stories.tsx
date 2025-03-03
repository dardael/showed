import { Meta, StoryObj } from '@storybook/react/*';
import HeaderWithColoredBackground from './headerWithColoredBackground';
import { Font } from 'showed/lib/theme/models/font';

const meta: Meta<typeof HeaderWithColoredBackground> = {
    component: HeaderWithColoredBackground,
};
export default meta;
type Story = StoryObj<typeof HeaderWithColoredBackground>;

export const Primary: Story = {
    args: {
        html: "<div>it's a header<div>",
    },
    argTypes: {
        html: {
            control: 'text',
        },
        font: {
            options: Object.keys(Font),
        },
    },
};
