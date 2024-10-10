'use client';
import { As, Icon as ChakraIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { GiHearts, GiLinkedRings, GiLovers } from 'react-icons/gi';
import { ThemeContext } from 'showed/app/providers';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default function Icon({ component }: { component: ComponentModel }) {
    const { theme } = useContext(ThemeContext);
    let icon: As;
    switch (component.content) {
        case 'GiLinkedRings':
            icon = GiLinkedRings;
            break;
        case 'GiHearts':
            icon = GiHearts;
            break;
        case 'GiLovers':
            icon = GiLovers;
            break;
        default:
            icon = GiLinkedRings;
            break;
    }
    return <ChakraIcon color={theme.color + '.400'} as={icon} boxSize='50px' />;
}
