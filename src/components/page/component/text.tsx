import { Text as ChakraText } from '@chakra-ui/react';
import getFontFamily from 'showed/components/core/font/font';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function Text({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <ChakraText
            fontFamily={getFontFamily(component.font)}
            textAlign={'center'}
            size={'md'}
        >
            {component.content}
        </ChakraText>
    );
}
