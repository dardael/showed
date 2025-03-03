import { Meta, StoryObj } from '@storybook/react/*';
import PageLinkButton from './pageLinkButton';

const meta: Meta<typeof PageLinkButton> = {
    component: PageLinkButton,
};
export default meta;
type Story = StoryObj<typeof PageLinkButton>;

export const Primary: Story = {
    args: {
        text: 'link to a page',
        link: '1',
    },
    argTypes: {
        text: {
            control: 'text',
        },
    },
};
