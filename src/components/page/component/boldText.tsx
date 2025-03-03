import { Heading } from '@chakra-ui/react';
import getFontFamily from 'showed/components/core/font/font';
import { Font } from 'showed/lib/theme/models/font';

export default async function BoldText({
    text,
    font,
}: {
    text: string;
    font?: Font;
}) {
    return (
        <Heading
            fontWeight={'500'}
            fontSize={'17px'}
            fontFamily={getFontFamily(font)}
        >
            {text}
        </Heading>
    );
}
