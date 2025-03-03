import { Meta, StoryObj } from '@storybook/react/*';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
    component: Icon,
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
    args: {
        icon: 'GiLinkedRings',
    },
    argTypes: {
        icon: {
            control: 'select',
            options: [
                'GiLinkedRings',
                'GiHearts',
                'GiLovers',
                'BsHouseHeartFill',
            ],
        },
    },
};
