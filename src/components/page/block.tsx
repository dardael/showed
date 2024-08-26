import { Box } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { getComponents } from 'showed/controllers/page/componentController';
import { Block as BlockModel } from 'showed/lib/page/models/block';

export default async function Block({ block }: { block: BlockModel }) {
    const components = await getComponents(block._id as string);
    let backgroundImage : string | undefined = '';
    if (block.backgroundImageId) {
        backgroundImage = (
            await getFile(block.backgroundImageId)
        )?.filepath.replace('./public', '');
    }
    return (
        <Box
            backgroundImage={backgroundImage}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
        >
            {components.map((component) => (
                <div
                    key={component._id}
                    dangerouslySetInnerHTML={{
                        __html: component.content,
                    }}
                />
            ))}
        </Box>
    );
}
