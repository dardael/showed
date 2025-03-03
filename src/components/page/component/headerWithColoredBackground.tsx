'use client';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';
import getFontFamily from 'showed/components/core/font/font';
import { Font } from 'showed/lib/theme/models/font';

export default function HeaderWithColoredBackground({
    html,
    font,
}: {
    html: string;
    font?: Font;
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Box
            paddingTop={'0'}
            paddingBottom={'5px'}
            paddingRight={'35px'}
            paddingLeft={'35px'}
            backgroundColor={theme.color + '.500'}
            color={'white'}
            borderRadius={'10px'}
            fontFamily={getFontFamily(font)}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    );
}
