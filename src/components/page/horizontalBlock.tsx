import { Box, Center, Flex } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { Block as BlockModel, isBlock } from 'showed/lib/page/models/block';
import {
    Component as ComponentModel,
    isComponent,
} from 'showed/lib/page/models/component';
import Component from './component';
import { getChildElements } from 'showed/controllers/page/blockController';
import { BlockType } from 'showed/lib/page/models/blockType';
import Block from './block';
import LinkedBlock from './linkedBlock';

export default async function HorizontalBlock({
    block,
}: {
    block: BlockModel;
}) {
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
        >
            <Box
                borderRadius={'10px'}
                {...(block.hasTransparentBackground && {
                    backgroundColor: '#FFFFFFBD',
                    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.22)',
                })}
            >
                <Flex wrap={'wrap'}>
                    {elements.map((element) => (
                        <Center key={element._id as string} flex={'1'}>
                            {isBlock(element) &&
                                element.blockType === BlockType.HORIZONTAL && (
                                    <HorizontalBlock block={element} />
                                )}
                            {isBlock(element) &&
                                element.blockType === BlockType.VERTICAL && (
                                    <Block block={element} />
                                )}
                            {isBlock(element) &&
                                element.blockType === BlockType.LINKED && (
                                    <LinkedBlock block={element} />
                                )}
                            {isComponent(element) && (
                                <Component
                                    isInHorizontalBlock
                                    component={element as ComponentModel}
                                />
                            )}
                        </Center>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
}
