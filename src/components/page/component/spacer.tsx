import { Box, Center } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function Spacer({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <Center>
            <Box height={component.content + 'px'}></Box>
        </Center>
    );
}
