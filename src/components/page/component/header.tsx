'use client';
import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';
import getFontFamily from 'showed/components/core/font/font';
import { Font } from 'showed/lib/theme/models/font';

export default function Header({ text, font }: { text: string; font?: Font }) {
    const { theme } = useContext(ThemeContext);
    return (
        <Heading
            fontFamily={getFontFamily(font)}
            as='h1'
            fontSize={'35px'}
            fontWeight={'500'}
            color={theme.color + '.500'}
        >
            {text}
        </Heading>
    );
}
