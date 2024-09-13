import { Center, Text as ChakraText } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function Text({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <ChakraText textAlign={'center'} size={'md'}>
            {component.content}
        </ChakraText>
    );
}
