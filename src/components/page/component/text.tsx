import { Center, Text as ChakraText } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function Text({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <Center>
            <ChakraText size={'md'}>{component.content}</ChakraText>
        </Center>
    );
}
