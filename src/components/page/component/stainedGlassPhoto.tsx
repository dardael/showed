import { Center, Image } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { getTheme } from 'showed/controllers/theme/themeController';
import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function StainedGlassPhoto({
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
        <Image
            src={filepath}
            alt='Photo couple'
            width={'185px'}
            height={'240px'}
            borderTopLeftRadius={'140px'}
            borderTopRightRadius={'140px'}
            borderStyle={'solid'}
            borderWidth={'4px'}
            borderColor={color + '.400'}
        />
    );
}
