'use client';
import { Center, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import { ThemeContext } from 'showed/app/providers';
import getFontFamily from 'showed/components/core/font/font';

export default function Header({ component }: { component: ComponentModel }) {
    const { theme } = useContext(ThemeContext);
    return (
        <Heading
            fontFamily={getFontFamily(component.font)}
            as='h1'
            fontSize={'35px'}
            fontWeight={'500'}
            color={theme.color + '.500'}
        >
            {component.content}
        </Heading>
    );
}
