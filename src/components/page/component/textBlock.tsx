import { Text as ChakraText } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default function TextBlock({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <ChakraText
            fontFamily={component.fontFamily || 'inherit'}
            fontWeight={component.fontWeight || 'normal'}
            fontSize={
                component.fontSize ? `${component.fontSize}px` : 'inherit'
            }
            textAlign={component.alignment || 'left'}
            color={
                component.foregroundColor === ''
                    ? 'transparent'
                    : component.foregroundColor || 'inherit'
            }
            backgroundColor={
                component.backgroundColor === ''
                    ? 'transparent'
                    : component.backgroundColor || 'transparent'
            }
            padding='10px'
            borderRadius='5px'
        >
            {component.content}
        </ChakraText>
    );
}
