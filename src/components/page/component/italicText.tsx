import { Heading } from '@chakra-ui/react';
import getFontFamily from 'showed/components/core/font/font';
import { Font } from 'showed/lib/theme/models/font';

export default async function ItalicText({
    text,
    font,
}: {
    text: string;
    font?: Font;
}) {
    return (
        <Heading
            fontFamily={getFontFamily(font)}
            fontWeight={'400'}
            fontStyle={'italic'}
            size={'md'}
        >
            {text}
        </Heading>
    );
}
