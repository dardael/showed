'use client';
import { Center, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import { ThemeContext } from 'showed/app/providers';

export default function Header({ component }: { component: ComponentModel }) {
    const { theme } = useContext(ThemeContext);
    return (
        <Center>
            <Heading as='h1' size='xl' color={theme.color + '.500'}>
                {component.content}
            </Heading>
        </Center>
    );
}
