import { Box, Divider, Flex, useToast } from '@chakra-ui/react';
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
import { FileType } from 'showed/components/core/input/fileType';
import FileInput from 'showed/components/core/form/inputs/fileInput';
import { getFile } from 'showed/controllers/image/imageController';
import NumberInput from 'showed/components/core/form/inputs/numberInput';
import DropdownButton from 'showed/components/core/button/dropdownButton';
import { BlockType, getBlockTypeLabel } from 'showed/lib/page/models/blockType';
import InvitationBlockData from './block/invitationBlockData';
import ProductsBlockData from './block/productsBlockData';
import Loading from 'showed/components/core/feedback/loading';

export default function PageData({
    page,
    onPageChange,
}: {
    page: Page;
    onPageChange: <U>(data: FormData) => Promise<U | void>;
}) {
    const [hasSoundChanged, setHasSoundChanged] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [initialFilePath, setInitialFilePath] = useState<string | null>(null);
    const handleFileChange = async (file: File | null) => {
        setFile(file);
        setHasSoundChanged(true);
    };
    const handleSubmit = async (formData: FormData) => {
        if (hasSoundChanged) {
            if (page.soundId) {
                await fetch(`api/image/${page.soundId}`, {
                    method: 'DELETE',
                });
                formData.delete('soundId');
            }
            if (file) {
                const fileFormData = new FormData();
                fileFormData.append('file', file);
                const result = await (
                    await fetch('api/sound', {
                        method: 'POST',
                        body: fileFormData,
                    })
                ).json();

                formData.set('soundId', result.id);
            }
            setHasSoundChanged(false);
            setFile(null);
        }
        return onPageChange(formData);
    };
    const notification = new Notification(useToast());
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const addNewBlock = async (blockType: BlockType) => {
        const newBlock = await BlockController.createBlock(
            blocks.length + 1,
            page._id as string,
            undefined,
            blockType
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
                if (page.soundId) {
                    const file = await getFile(page.soundId);
                    setInitialFilePath(file?.filepath as string);
                    setBlocks([...foundBlocks]);
                    setIsLoading(false);
                } else {
                    setBlocks([...foundBlocks]);
                    setIsLoading(false);
                }
            }
        );
    }, [page.soundId, page._id]);
    return (
        <Loading isLoading={isLoading}>
            <Box padding={'40px'}>
                <SaveForm
                    parameters={[
                        { key: 'id', value: page._id },
                        {
                            key: 'position',
                            value: page.position.toString(),
                        },
                    ]}
                    action={handleSubmit}
                >
                    <TextInput
                        isRequired
                        name='title'
                        label='Titre'
                        placeholder='Titre affiché dans le menu'
                        defaultValue={page?.title}
                    />
                    <FileInput
                        name='sound'
                        label='Son'
                        onChange={handleFileChange}
                        defaultValue={initialFilePath}
                        fileType={FileType.AUDIO}
                        allowedFileExtensions={['mp3', 'mp4', 'wav']}
                    />
                    <NumberInput
                        name='width'
                        label='Largeur'
                        placeholder='Largeur de la page'
                        defaultValue={page?.width}
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
                    <Flex direction={'row-reverse'} gap={'10px'}>
                        <DropdownButton
                            label={'Ajouter un block'}
                            icon={<FaPlus />}
                            onSelectedItem={(key) =>
                                addNewBlock(key as BlockType)
                            }
                            items={[
                                {
                                    key: BlockType.VERTICAL,
                                    label: getBlockTypeLabel(
                                        BlockType.VERTICAL
                                    ),
                                },
                                {
                                    key: BlockType.HORIZONTAL,
                                    label: getBlockTypeLabel(
                                        BlockType.HORIZONTAL
                                    ),
                                },
                                {
                                    key: BlockType.INVITATION,
                                    label: getBlockTypeLabel(
                                        BlockType.INVITATION
                                    ),
                                },
                                {
                                    key: BlockType.PRODUCTS,
                                    label: getBlockTypeLabel(
                                        BlockType.PRODUCTS
                                    ),
                                },
                            ]}
                        />
                    </Flex>
                    <Box paddingTop={'55px'}>
                        <DynamicAccordion<Block>
                            elements={blocks.map((block) => ({
                                reference: block,
                                title: block.title,
                                content: (
                                    <>
                                        {(block.blockType ===
                                            BlockType.VERTICAL ||
                                            block.blockType ===
                                                BlockType.HORIZONTAL) && (
                                            <BlockData
                                                block={block}
                                                onBlockChange={async (
                                                    data: FormData
                                                ) => {
                                                    const pendingSave =
                                                        BlockController.saveBlock(
                                                            data
                                                        );
                                                    pendingSave.then(
                                                        updateBlock
                                                    );
                                                    return pendingSave;
                                                }}
                                            />
                                        )}
                                        {block.blockType ===
                                            BlockType.INVITATION && (
                                            <InvitationBlockData<Block>
                                                block={block}
                                                onBlockChange={(
                                                    data: FormData
                                                ) => {
                                                    const pendingSave =
                                                        BlockController.saveBlock(
                                                            data
                                                        );
                                                    pendingSave.then(
                                                        updateBlock
                                                    );
                                                    return pendingSave;
                                                }}
                                            />
                                        )}
                                        {block.blockType ===
                                            BlockType.PRODUCTS && (
                                            <ProductsBlockData
                                                block={block}
                                                onBlockChange={(
                                                    data: FormData
                                                ) => {
                                                    const pendingSave =
                                                        BlockController.saveBlock(
                                                            data
                                                        );
                                                    pendingSave.then(
                                                        updateBlock
                                                    );
                                                    return pendingSave;
                                                }}
                                            />
                                        )}
                                    </>
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
                                        title: 'Supprimer le block',
                                        action: (block) => deleteBlock(block),
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
        </Loading>
    );
}
