import { Meta, StoryObj } from '@storybook/react/*';
import CalendarButton from './calendarButton';

const meta: Meta<typeof CalendarButton> = {
    component: CalendarButton,
};
export default meta;
type Story = StoryObj<typeof CalendarButton>;

export const Primary: Story = {
    args: {
        text: 'link',
        link: 'https://maps.app.goo.gl/UzDpf2p7Ud19RrHW8',
    },
    argTypes: {
        text: {
            control: 'text',
        },
        link: {
            control: 'text',
        },
    },
};
