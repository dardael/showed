import { Component as ComponentModel } from 'showed/lib/page/models/component';
import RichText from './component/richText';
import { Box } from '@chakra-ui/react';
import Header from './component/header';
import BoldText from './component/boldText';
import Text from './component/text';
import dynamic from 'next/dynamic';

export default async function Component({
    component,
}: {
    component: ComponentModel;
}) {
    const Countdown = dynamic(() => import('./component/countdown'), {
        ssr: false,
    });
    return (
        <Box padding={'10px'}>
            {component.componentType === 'RICH_TEXT_EDITOR' && (
                <RichText component={component} />
            )}
            {component.componentType === 'COUNTDOWN' && (
                <Countdown component={component} />
            )}
            {component.componentType === 'HEADER' && (
                <Header component={component} />
            )}
            {component.componentType === 'BOLD_TEXT' && (
                <BoldText component={component} />
            )}
            {component.componentType === 'TEXT' && (
                <Text component={component} />
            )}
        </Box>
    );
}
