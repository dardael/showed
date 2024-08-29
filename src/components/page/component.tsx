import { Component as ComponentModel } from 'showed/lib/page/models/component';
import RichText from './component/richText';
import Countdown from './component/countdown';
import { Box } from '@chakra-ui/react';

export default async function Component({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <Box padding={'10px'}>
            {component.componentType === 'RICH_TEXT_EDITOR' && (
                <RichText component={component} />
            )}
            {component.componentType === 'COUNTDOWN' && (
                <Countdown component={component} />
            )}
        </Box>
    );
}
