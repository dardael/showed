import { Meta, StoryObj } from '@storybook/react/*';
import BoldText from './boldText';
import { Font } from 'showed/lib/theme/models/font';

const meta: Meta<typeof BoldText> = {
    component: BoldText,
};
export default meta;
type Story = StoryObj<typeof BoldText>;

export const Primary: Story = {
    args: {
        text: "it's a bold text",
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
