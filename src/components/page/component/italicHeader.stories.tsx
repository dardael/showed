import { Meta, StoryObj } from '@storybook/react/*';
import ItalicHeader from './italicHeader';
import { Font } from 'showed/lib/theme/models/font';
const meta: Meta<typeof ItalicHeader> = {
    component: ItalicHeader,
};
export default meta;
type Story = StoryObj<typeof ItalicHeader>;

export const Primary: Story = {
    render: (args) => {
        return <ItalicHeader text={args.text} font={args.font} />;
    },
    args: {
        text: "it's an italicHeader",
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
