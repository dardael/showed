import { Box, Button, Divider, Spinner, useToast } from '@chakra-ui/react';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { Page } from 'showed/lib/page/models/page';
import { useEffect, useState } from 'react';
import * as BlockController from 'showed/controllers/page/blockController';
import { Block } from 'showed/lib/page/models/block';
import { Notification } from 'showed/components/core/feedback/notification';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import DynamicAccordion from 'showed/components/core/accordion/dynamicAccordion';
import { FaPlus } from 'react-icons/fa6';
import BlockData from 'showed/components/admin/page/block/blockData';

export default function PageData({
    page,
    onPageChange,
}: {
    page: Page;
    onPageChange: (data: FormData) => Promise<any>;
}) {
    const notification = new Notification(useToast());
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const addNewBlock = async () => {
        const newBlock = await BlockController.createBlock(
            blocks.length + 1,
            page._id as string
        );
        blocks.push(newBlock);
        setBlocks([...blocks]);
    };
    const updateBlock = (updatedBlock: Block) => {
        setBlocks([
            ...blocks.map((block) =>
                block._id === updatedBlock._id ? updatedBlock : block
            ),
        ]);
    };
    const deleteBlock = (blockToDelete: Block) => {
        if (blockToDelete._id === undefined) {
            return;
        }
        notification.handlePromise(
            BlockController.deleteBlock(blockToDelete._id).then(async () => {
                const orderedBlocks = await updateBlocksPosition();
                setBlocks([
                    ...orderedBlocks.filter(
                        (block) => block._id !== blockToDelete._id
                    ),
                ]);
            }),
            {
                loading: 'Block en cours de suppression',
                success: 'Le block a été supprimé avec succès',
                error: 'Erreur lors de la suppression du block',
            }
        );
    };
    const moveBlock = async (blockToMove: Block, direction: SortDirection) => {
        notification.handlePromise(
            BlockController.moveBlock(blockToMove, direction).then(async () => {
                const orderedBlocks = await updateBlocksPosition();
                setBlocks([...orderedBlocks]);
            }),
            {
                loading: 'Block en cours de déplacement',
                success: 'Le block a été déplacé avec succès',
                error: 'Erreur lors du déplacement du block',
            }
        );
    };
    const updateBlocksPosition = async () => {
        const blocksWithUpdatedPosition = await BlockController.getBlocks(
            page._id as string
        );
        blocks.forEach((block) => {
            const updatedBlock = blocksWithUpdatedPosition.find(
                (p) => p._id === block._id
            );
            if (updatedBlock) {
                block.position = updatedBlock.position;
            }
        });
        blocks.sort((a, b) => a.position - b.position);
        return blocks;
    };
    useEffect(() => {
        BlockController.getBlocks(page._id as string).then(
            async (foundBlocks: Block[]) => {
                setBlocks([...foundBlocks]);
                setIsLoading(false);
            }
        );
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    <SaveForm
                        parameters={[
                            { key: 'id', value: page._id },
                            { key: 'position', value: page.position },
                        ]}
                        action={onPageChange}
                    >
                        <TextInput
                            isRequired
                            name='title'
                            label='Titre'
                            placeholder='Titre affiché dans le menu'
                            defaultValue={page?.title}
                        />
                    </SaveForm>
                    <Box
                        paddingTop={'20px'}
                        paddingLeft={'20px'}
                        paddingRight={'20px'}
                    />
                    <Divider />
                    <Box
                        paddingTop={'20px'}
                        paddingLeft={'20px'}
                        paddingRight={'20px'}
                    >
                        <Button
                            title='Ajouter un block'
                            aria-label={'Ajouter un block'}
                            leftIcon={<FaPlus />}
                            onClick={addNewBlock}
                            position='absolute'
                            right='70px'
                        >
                            Ajouter un block
                        </Button>
                        <Box paddingTop={'55px'}>
                            <DynamicAccordion
                                elements={blocks.map((block) => ({
                                    reference: block,
                                    title: block.title,
                                    content: (
                                        <BlockData
                                            block={block}
                                            onBlockChange={async (
                                                data: FormData
                                            ) => {
                                                const pendingSave =
                                                    BlockController.saveBlock(
                                                        data
                                                    );
                                                pendingSave.then(updateBlock);
                                                return pendingSave;
                                            }}
                                        />
                                    ),
                                    buttons: {
                                        sort: {
                                            sortUp: {
                                                title: 'Déplacer le block vers le haut',
                                                action: (block) => {
                                                    moveBlock(
                                                        block,
                                                        SortDirection.UP
                                                    );
                                                },
                                            },
                                            sortDown: {
                                                title: 'Déplacer le block vers le bas',
                                                action: (block) => {
                                                    moveBlock(
                                                        block,
                                                        SortDirection.DOWN
                                                    );
                                                },
                                            },
                                        },
                                        delete: {
                                            title: 'Supprimer la block',
                                            action: (block) =>
                                                deleteBlock(block),
                                            confirmation: {
                                                title: 'Supprimer un block',
                                                content: `Souhaitez vous supprimer le block "${block.title}" ?\nLe block sera perdue.`,
                                                acceptButtonTitle: 'Supprimer',
                                                cancelButtonTitle: 'Annuler',
                                            },
                                        },
                                    },
                                }))}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
