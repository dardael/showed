import { Meta, StoryObj } from '@storybook/react/*';
import Countdown from './countdown';

const meta: Meta<typeof Countdown> = {
    component: Countdown,
};
export default meta;
type Story = StoryObj<typeof Countdown>;

export const Primary: Story = {
    args: {
        date: new Date().toUTCString(),
    },
    argTypes: {
        date: {
            control: 'date',
        },
    },
};
