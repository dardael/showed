'use client';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import { ThemeContext } from 'showed/app/providers';

export default function HeaderWithColoredBackground({
    component,
}: {
    component: ComponentModel;
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Box
            paddingTop={'0'}
            paddingBottom={'5px'}
            paddingRight={'35px'}
            paddingLeft={'35px'}
            backgroundColor={theme.color + '.500'}
            color={'white'}
            borderRadius={'10px'}
            key={component._id}
            dangerouslySetInnerHTML={{
                __html: component.content,
            }}
        />
    );
}
