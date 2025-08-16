import { Center, Flex } from '@chakra-ui/react';
import { SoundPlayer } from 'showed/components/core/player/soundPlayer';
import Block from 'showed/components/page/block';
import { Page as PageModel } from 'showed/lib/page/models/page';
import InvitationBlock from 'showed/components/page/invitationBlock';
import { BlockType } from 'showed/lib/page/models/blockType';
import { Block as BlockModel } from 'showed/lib/page/models/block';
import { Person } from 'showed/lib/invitation/models/person';
import HorizontalBlock from 'showed/components/page/horizontalBlock';
import ProductsBlock from 'showed/components/page/productsBlock';

const fillReceptionDisplayRule = (
    block: BlockModel,
    person: Person | undefined
) => {
    return (
        !block.isVisibleOnlyWhenInvitedToReception ||
        (block.isVisibleOnlyWhenInvitedToReception &&
            person?.isInvitedToReception)
    );
};

const fillMealDisplayRule = (block: BlockModel, person: Person | undefined) => {
    return (
        !block.isVisibleOnlyWhenInvitedToMeal ||
        (block.isVisibleOnlyWhenInvitedToMeal && person?.isInvitedToMeal)
    );
};

const fillTownHallDisplayRule = (
    block: BlockModel,
    person: Person | undefined
) => {
    return (
        !block.isVisibleOnlyWhenInvitedToTownHall ||
        (block.isVisibleOnlyWhenInvitedToTownHall &&
            person?.isInvitedToTownHall)
    );
};

export default async function Page({
    page,
    person,
}: {
    page: PageModel;
    person?: Person;
}) {
    const blockComponents = ((page.children || []) as BlockModel[])
        .filter(
            (block) =>
                fillReceptionDisplayRule(block, person) &&
                fillMealDisplayRule(block, person) &&
                fillTownHallDisplayRule(block, person)
        )
        .map((block) => (
            <>
                {block.blockType === BlockType.VERTICAL && (
                    <Block key={block._id as string} block={block} />
                )}
                {block.blockType === BlockType.INVITATION && (
                    <InvitationBlock key={block._id as string} block={block} />
                )}
                {block.blockType === BlockType.HORIZONTAL && (
                    <HorizontalBlock key={block._id as string} block={block} />
                )}
                {block.blockType === BlockType.PRODUCTS && (
                    <ProductsBlock key={block._id as string} />
                )}
            </>
        ));

    const hasWidth = !!page?.width;
    return (
        <>
            {!hasWidth && (
                <Flex height={'100vh'} direction={'column'}>
                    {page?.soundId && (
                        <SoundPlayer soundId={page?.soundId as string} />
                    )}
                    {blockComponents}
                </Flex>
            )}
            {hasWidth && (
                <Center>
                    {' '}
                    <Flex
                        height={'100vh'}
                        maxWidth={page.width + 'px'}
                        width={'-webkit-fill-available'}
                        direction={'column'}
                    >
                        {page?.soundId && (
                            <SoundPlayer soundId={page?.soundId as string} />
                        )}
                        {blockComponents}
                    </Flex>
                </Center>
            )}
        </>
    );
}
