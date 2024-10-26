import { Center, Heading } from '@chakra-ui/react';
import getFontFamily from 'showed/components/core/font/font';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function BoldText({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <Heading
            fontWeight={'500'}
            fontSize={'17px'}
            fontFamily={getFontFamily(component.font)}
        >
            {component.content}
        </Heading>
    );
}
