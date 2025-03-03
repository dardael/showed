import { Heading } from '@chakra-ui/react';
import { getTheme } from 'showed/controllers/theme/themeController';
import getFontFamily from 'showed/components/core/font/font';
import { Font } from 'showed/lib/theme/models/font';

export default async function ItalicHeader({
    text,
    font,
}: {
    text: string;
    font?: Font;
}) {
    const theme = await getTheme();
    return (
        <Heading
            as='h1'
            size='xl'
            color={theme.color + '.500'}
            fontWeight={'500'}
            fontFamily={getFontFamily(font)}
        >
            {text}
        </Heading>
    );
}
