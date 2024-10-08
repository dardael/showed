import { Heading } from '@chakra-ui/react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import { getTheme } from 'showed/controllers/theme/themeController';

export default async function ItalicHeader({
    component,
}: {
    component: ComponentModel;
}) {
    const theme = await getTheme();
    return (
        <Heading
            as='h1'
            size='xl'
            color={theme.color + '.500'}
            fontWeight={'500'}
        >
            {component.content}
        </Heading>
    );
}
