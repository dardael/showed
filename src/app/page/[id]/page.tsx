import { Box, Center } from '@chakra-ui/react';
import { SoundPlayer } from 'showed/components/core/player/soundPlayer';
import Block from 'showed/components/page/block';
import InvitationBlock from 'showed/components/page/invitationBlock';
import { getBlocks } from 'showed/controllers/page/blockController';
import { getPages } from 'showed/controllers/page/pageController';
import { BlockType } from 'showed/lib/page/models/blockType';

export default async function Page({ params }: { params: { id: string } }) {
    const response = await getPages();
    const page = response.find((page) => page.urlPart === params.id);
    const blocks = await getBlocks(page?._id as string);
    const hasWidth = !!page?.width;
    return (
        <>
            {!hasWidth && (
                <Box>
                    {page?.soundId && (
                        <SoundPlayer soundId={page?.soundId as string} />
                    )}
                    {blocks.map((block) => (
                        <>
                            {(!block.blockType ||
                                block.blockType === BlockType.VERTICAL) && (
                                <Block
                                    key={block._id as string}
                                    block={block}
                                />
                            )}
                            {block.blockType === BlockType.INVITATION && (
                                <InvitationBlock
                                    key={block._id as string}
                                    block={block}
                                />
                            )}
                        </>
                    ))}
                </Box>
            )}
            {hasWidth && (
                <Center>
                    {' '}
                    <Box
                        maxWidth={page.width + 'px'}
                        width={'-webkit-fill-available'}
                    >
                        {page?.soundId && (
                            <SoundPlayer soundId={page?.soundId as string} />
                        )}
                        {blocks.map((block) => (
                            <>
                                {(!block.blockType ||
                                    block.blockType === BlockType.VERTICAL) && (
                                    <Block
                                        key={block._id as string}
                                        block={block}
                                    />
                                )}
                                {block.blockType === BlockType.INVITATION && (
                                    <InvitationBlock
                                        key={block._id as string}
                                        block={block}
                                    />
                                )}
                            </>
                        ))}
                    </Box>
                </Center>
            )}
        </>
    );
}
