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
        link: 'https://google.fr',
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
