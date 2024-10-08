'use client';
import { Center, Text as ChakraText, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function UnderlinedAndAbovelinedText({
    component,
}: {
    component: ComponentModel;
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Heading
            as='h2'
            size='lg'
            color={theme.color + '.500'}
            textAlign={'center'}
            borderTop={'solid'}
            borderBottom={'solid'}
            borderTopWidth={'2px'}
            borderBottomWidth={'2px'}
            borderColor={theme.color + '.500'}
        >
            {component.content}
        </Heading>
    );
}
