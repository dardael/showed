import { Meta, StoryObj } from '@storybook/react/*';
import ItalicText from './italicText';
import { Font } from 'showed/lib/theme/models/font';
const meta: Meta<typeof ItalicText> = {
    component: ItalicText,
};
export default meta;
type Story = StoryObj<typeof ItalicText>;

export const Primary: Story = {
    render: (args) => {
        return <ItalicText text={args.text} font={args.font} />;
    },
    args: {
        text: "it's an italicText",
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
