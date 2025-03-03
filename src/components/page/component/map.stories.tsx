import { Meta, StoryObj } from '@storybook/react/*';
import Map from './map';
const meta: Meta<typeof Map> = {
    component: Map,
};
export default meta;
type Story = StoryObj<typeof Map>;

export const Primary: Story = {
    render: (args) => {
        return <Map localization={args.localization} />;
    },
    args: {
        localization: '48.85701844125521, 2.299653975691902',
    },
    argTypes: {
        localization: {
            control: 'text',
        },
    },
};
