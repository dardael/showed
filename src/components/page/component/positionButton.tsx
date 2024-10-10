'use client';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default function PositionButton({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <ChakraButton
            height={'29px'}
            borderStyle={'solid'}
            borderWidth={'2px'}
            borderColor={'white'}
            onClick={() => window.open(component.link, '_blank')}
            leftIcon={<FaLocationDot />}
        >
            {component.content}
        </ChakraButton>
    );
}
