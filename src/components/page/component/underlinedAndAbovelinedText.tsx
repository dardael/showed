import { Heading } from '@chakra-ui/react';
import { getTheme } from 'showed/controllers/theme/themeController';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function UnderlinedAndAbovelinedText({
    component,
}: {
    component: ComponentModel;
}) {
    const theme = await getTheme();
    return (
        <Heading
            as='h2'
            size='lg'
            color={theme.color + '.500'}
            textAlign={'center'}
            borderTop={'solid'}
            borderBottom={'solid'}
            borderTopWidth={'1px'}
            borderBottomWidth={'1px'}
            borderColor={theme.color + '.500'}
        >
            {component.content.replace('\r\n', '<br>')}
        </Heading>
    );
}
