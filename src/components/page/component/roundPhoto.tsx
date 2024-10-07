import { Avatar, Center } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { getTheme } from 'showed/controllers/theme/themeController';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function RoundPhoto({
    component,
}: {
    component: ComponentModel;
}) {
    const filepath = (await getFile(component.content))?.filepath.replace(
        './public',
        ''
    );
    const color = (await getTheme()).color;
    return (
        <Avatar
            height={'169px'}
            width={'169px'}
            src={filepath}
            borderStyle={'solid'}
            borderWidth={'3px'}
            borderColor={color + '.400'}
        />
    );
}
