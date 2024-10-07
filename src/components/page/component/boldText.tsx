import { Center, Heading } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function BoldText({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <Heading fontWeight={'600'} size={'md'}>
            {component.content}
        </Heading>
    );
}
