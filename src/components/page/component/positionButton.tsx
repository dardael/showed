'use client';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';

export default function PositionButton({
    text,
    link,
}: {
    text: string;
    link: string;
}) {
    return (
        <ChakraButton
            height={'29px'}
            borderStyle={'solid'}
            borderWidth={'2px'}
            borderColor={'white'}
            onClick={() => window.open(link, '_blank')}
            leftIcon={<FaLocationDot />}
        >
            {text}
        </ChakraButton>
    );
}
