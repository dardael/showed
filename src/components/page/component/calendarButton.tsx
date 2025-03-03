'use client';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa6';

export default function CalendarButton({
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
            leftIcon={<FaCalendar />}
        >
            {text}
        </ChakraButton>
    );
}
