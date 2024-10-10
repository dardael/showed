import { Center, Heading } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function ItalicText({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <Heading fontWeight={'400'} fontStyle={'italic'} size={'md'}>
            {component.content}
        </Heading>
    );
}
