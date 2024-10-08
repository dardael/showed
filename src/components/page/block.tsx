import { Box, Center } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { Block as BlockModel, isBlock } from 'showed/lib/page/models/block';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import Component from './component';
import { getChildElements } from 'showed/controllers/page/blockController';
import HorizontalBlock from './horizontalBlock';

export default async function Block({ block }: { block: BlockModel }) {
    const elements = await getChildElements(block._id as string);
    let backgroundImage: string | undefined = '';
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
            padding={'10px'}
        >
            <Box
                padding={'10px'}
                borderRadius={'10px'}
                {...(block.hasTransparentBackground && {
                    backgroundColor: '#FFFFFFBD',
                    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.22)',
                })}
            >
                {elements.map((element) => (
                    <Center key={element._id as string}>
                        {isBlock(element) ? (
                            <HorizontalBlock block={element} />
                        ) : (
                            <Component
                                isInHorizontalBlock={false}
                                component={element as ComponentModel}
                            />
                        )}
                    </Center>
                ))}
            </Box>
        </Box>
    );
}
