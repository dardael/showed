import { Box, Divider, Spinner, useToast, Flex } from '@chakra-ui/react';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { Block, isBlock } from 'showed/lib/page/models/block';
import { useEffect, useState } from 'react';
import * as ComponentController from 'showed/controllers/page/componentController';
import * as BlockController from 'showed/controllers/page/blockController';
import { Component, isComponent } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import { Notification } from 'showed/components/core/feedback/notification';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import DynamicAccordion from 'showed/components/core/accordion/dynamicAccordion';
import { FaPlus } from 'react-icons/fa6';
import ComponentData from 'showed/components/admin/page/component/componentData';
import FileInput from 'showed/components/core/form/inputs/fileInput';
import CheckBoxInput from 'showed/components/core/form/inputs/checkBoxInput';
import { FileType } from 'showed/components/core/input/fileType';
import { BlockType } from 'showed/lib/page/models/blockType';
import DropdownButton from 'showed/components/core/button/dropdownButton';
import SwitchInput from 'showed/components/core/form/inputs/switchInput';

export default function BlockData({
    block,
    onBlockChange,
}: {
    block: Block;
    onBlockChange: (data: FormData) => Promise<any>;
}) {
    const notification = new Notification(useToast());
    const [childElements, setElements] = useState<(Component | Block)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasIconChanged, setHasIconChanged] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [initialFilePath, setInitialFilePath] = useState<string | null>(null);
    const handleFileChange = async (file: File | null) => {
        setFile(file);
        setHasIconChanged(true);
    };
    const handleSubmit = async (formData: FormData) => {
        if (hasIconChanged) {
            if (block.backgroundImageId) {
                await fetch(`api/image/${block.backgroundImageId}`, {
                    method: 'DELETE',
                });
                formData.delete('backgroundImageId');
            }
            if (file) {
                const fileFormData = new FormData();
                fileFormData.append('file', file);
                const result = await (
                    await fetch('api/image', {
                        method: 'POST',
                        body: fileFormData,
                    })
                ).json();

                formData.set('backgroundImageId', result.id);
            }
            setHasIconChanged(false);
            setFile(null);
        }
        return onBlockChange(formData);
    };
    const addNewComponent = async (componentType: ComponentType) => {
        const newComponent = await ComponentController.createComponent(
            block._id as string,
            componentType,
            childElements.length + 1
        );
        childElements.push(newComponent);
        setElements([...childElements]);
    };
    const addNewBlock = async (blockType?: BlockType) => {
        const newBlock = await BlockController.createBlock(
            childElements.length + 1,
            undefined,
            block._id as string,
            blockType
        );
        childElements.push(newBlock);
        setElements([...childElements]);
    };
    const updateBlock = (updatedBlock: Block) => {
        setElements([
            ...childElements.map((element) =>
                element._id === updatedBlock._id ? updatedBlock : element
            ),
        ]);
    };
    const updateComponent = (updatedComponent: Component) => {
        setElements([
            ...childElements.map((component) =>
                component._id === updatedComponent._id
                    ? updatedComponent
                    : component
            ),
        ]);
    };
    const deleteBlock = (blockToDelete: Block) => {
        if (blockToDelete._id === undefined) {
            return;
        }
        notification.handlePromise(
            BlockController.deleteBlock(blockToDelete._id).then(async () => {
                const orderedComponents = await updateElementsPosition();
                setElements([
                    ...orderedComponents.filter(
                        (component) => component._id !== blockToDelete._id
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
    const deleteComponent = (componentToDelete: Component) => {
        if (componentToDelete._id === undefined) {
            return;
        }
        notification.handlePromise(
            ComponentController.deleteComponent(componentToDelete._id).then(
                async () => {
                    const orderedComponents = await updateElementsPosition();
                    setElements([
                        ...orderedComponents.filter(
                            (component) =>
                                component._id !== componentToDelete._id
                        ),
                    ]);
                }
            ),
            {
                loading: 'Composant en cours de suppression',
                success: 'Le composant a été supprimé avec succès',
                error: 'Erreur lors de la suppression du composant',
            }
        );
    };
    const moveElement = async (
        elementToMove: Block | Component,
        direction: SortDirection
    ) => {
        notification.handlePromise(
            BlockController.moveChildElement(elementToMove, direction).then(
                async () => {
                    const orderedElements = await updateElementsPosition();
                    setElements([...orderedElements]);
                }
            ),
            {
                loading: 'Elément en cours de déplacement',
                success: "L'élément a été déplacé avec succès",
                error: 'Erreur lors du déplacement de lélément',
            }
        );
    };
    const updateElementsPosition = async () => {
        const componentsWithUpdatedPosition =
            await ComponentController.getComponents(block._id as string);
        childElements.forEach((component) => {
            const updatedComponent = componentsWithUpdatedPosition.find(
                (p) => p._id === component._id
            );
            if (updatedComponent) {
                component.position = updatedComponent.position;
            }
        });
        childElements.sort((a, b) => a.position - b.position);
        return childElements;
    };
    useEffect(() => {
        BlockController.getChildElements(block._id as string).then(
            async (foundElements: (Block | Component)[]) => {
                if (block.backgroundImageId) {
                    await fetch(
                        `api/image/${block.backgroundImageId}?mustReturnData=1`
                    ).then(async (response) => {
                        const result = await response.json();
                        setInitialFilePath(result.filepath);
                        setElements([...foundElements]);
                        setIsLoading(false);
                    });
                } else {
                    setElements([...foundElements]);
                    setIsLoading(false);
                }
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
                            { key: 'id', value: block._id },
                            { key: 'position', value: block.position },
                            {
                                key: 'backgroundImageId',
                                value: block.backgroundImageId,
                            },
                        ]}
                        action={handleSubmit}
                    >
                        <TextInput
                            isRequired
                            name='title'
                            label='Titre'
                            placeholder='Titre'
                            defaultValue={block?.title}
                        />
                        <FileInput
                            name='backgroundImage'
                            label='Image en arriére plan'
                            defaultValue={initialFilePath}
                            onChange={handleFileChange}
                            allowedFileExtensions={['png, jpg, jpeg']}
                            fileType={FileType.IMAGE}
                        />
                        <CheckBoxInput
                            name='hasTransparentBackground'
                            label='Fond transparent'
                            defaultValue={block.hasTransparentBackground}
                        />
                        <SwitchInput
                            name='isVisibleOnlyWhenInvitedToMeal'
                            label="Visible seulement si invité au vin d'honneur"
                            defaultValue={block.isVisibleOnlyWhenInvitedToMeal}
                        />
                        <SwitchInput
                            name='isVisibleOnlyWhenInvitedToReception'
                            label='Visible seulement si invité au repas'
                            defaultValue={
                                block.isVisibleOnlyWhenInvitedToReception
                            }
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
                            {block.parentBlockId ? (
                                <></>
                            ) : (
                                <DropdownButton
                                    label={'Ajouter un sous-block'}
                                    icon={<FaPlus />}
                                    onSelectedItem={addNewBlock}
                                    items={[
                                        {
                                            key: BlockType.HORIZONTAL,
                                            label: BlockType.getBlockTypeLabel(
                                                BlockType.HORIZONTAL
                                            ),
                                        },
                                        {
                                            key: BlockType.LINKED,
                                            label: BlockType.getBlockTypeLabel(
                                                BlockType.LINKED
                                            ),
                                        },
                                    ]}
                                />
                            )}
                            {block.blockType === BlockType.LINKED && (
                                <DropdownButton
                                    label={'Ajouter un texte'}
                                    icon={<FaPlus />}
                                    onSelectedItem={addNewComponent}
                                    items={[
                                        {
                                            key: ComponentType.RICH_TEXT_EDITOR,
                                            label: ComponentType.getComponentTypeLabel(
                                                ComponentType.RICH_TEXT_EDITOR
                                            ),
                                        },
                                    ]}
                                />
                            )}
                            {(block.pageId ||
                                block.blockType === BlockType.HORIZONTAL) && (
                                <>
                                    <DropdownButton
                                        label={'Ajouter un composant'}
                                        icon={<FaPlus />}
                                        onSelectedItem={addNewComponent}
                                        items={[
                                            {
                                                key: ComponentType.MAP,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.MAP
                                                ),
                                            },
                                            {
                                                key: ComponentType.COUNTDOWN,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.COUNTDOWN
                                                ),
                                            },
                                            {
                                                key: ComponentType.SPACER,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.SPACER
                                                ),
                                            },
                                        ]}
                                    />
                                    <DropdownButton
                                        label={'Ajouter un bouton'}
                                        icon={<FaPlus />}
                                        onSelectedItem={addNewComponent}
                                        items={[
                                            {
                                                key: ComponentType.CALENDAR_BUTTON,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.CALENDAR_BUTTON
                                                ),
                                            },
                                            {
                                                key: ComponentType.POSITION_BUTTON,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.POSITION_BUTTON
                                                ),
                                            },
                                            {
                                                key: ComponentType.PAGE_LINK_BUTTON,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.PAGE_LINK_BUTTON
                                                ),
                                            },
                                        ]}
                                    />
                                    <DropdownButton
                                        label={'Ajouter une image'}
                                        icon={<FaPlus />}
                                        onSelectedItem={addNewComponent}
                                        items={[
                                            {
                                                key: ComponentType.ICON,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.ICON
                                                ),
                                            },
                                            {
                                                key: ComponentType.ROUND_PHOTO,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.ROUND_PHOTO
                                                ),
                                            },
                                            {
                                                key: ComponentType.STAINED_GLASS_PHOTO,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.STAINED_GLASS_PHOTO
                                                ),
                                            },
                                        ]}
                                    />
                                    <DropdownButton
                                        label={'Ajouter un texte'}
                                        icon={<FaPlus />}
                                        onSelectedItem={addNewComponent}
                                        items={[
                                            {
                                                key: ComponentType.TEXT,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.TEXT
                                                ),
                                            },
                                            {
                                                key: ComponentType.ITALIC_TEXT,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.ITALIC_TEXT
                                                ),
                                            },
                                            {
                                                key: ComponentType.BOLD_TEXT,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.BOLD_TEXT
                                                ),
                                            },
                                            {
                                                key: ComponentType.UNDERLINED_ABOVELINED_TEXT,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.UNDERLINED_ABOVELINED_TEXT
                                                ),
                                            },
                                            {
                                                key: ComponentType.HEADER,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.HEADER
                                                ),
                                            },
                                            {
                                                key: ComponentType.ITALIC_HEADER,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.ITALIC_HEADER
                                                ),
                                            },
                                            {
                                                key: ComponentType.HEADER_WITH_COLORED_BACKGROUND,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.HEADER_WITH_COLORED_BACKGROUND
                                                ),
                                            },
                                            {
                                                key: ComponentType.RICH_TEXT_EDITOR,
                                                label: ComponentType.getComponentTypeLabel(
                                                    ComponentType.RICH_TEXT_EDITOR
                                                ),
                                            },
                                        ]}
                                    />
                                </>
                            )}
                        </Flex>
                        <Box paddingTop={'55px'}>
                            <DynamicAccordion
                                elements={childElements.map((element) => ({
                                    reference: element,
                                    title:
                                        element.title +
                                        ' (' +
                                        (isComponent(element)
                                            ? ComponentType.getComponentTypeLabel(
                                                  element.componentType
                                              )
                                            : '') +
                                        (isBlock(element) && element.blockType
                                            ? BlockType.getBlockTypeLabel(
                                                  element.blockType as BlockType
                                              )
                                            : '') +
                                        ')',
                                    content: isComponent(element) ? (
                                        <ComponentData
                                            component={element as Component}
                                            onSave={async (data) => {
                                                const pendingSave =
                                                    ComponentController.saveComponent(
                                                        data
                                                    );
                                                pendingSave.then(
                                                    updateComponent
                                                );
                                                return pendingSave;
                                            }}
                                        />
                                    ) : (
                                        <BlockData
                                            block={element as Block}
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
                                                title: 'Déplacer vers le haut',
                                                action: (element) => {
                                                    moveElement(
                                                        element,
                                                        SortDirection.UP
                                                    );
                                                },
                                            },
                                            sortDown: {
                                                title: 'Déplacer vers le bas',
                                                action: (element) => {
                                                    moveElement(
                                                        element,
                                                        SortDirection.DOWN
                                                    );
                                                },
                                            },
                                        },
                                        delete: {
                                            title: 'Supprimer',
                                            action: (element) =>
                                                isComponent(element)
                                                    ? deleteComponent(element)
                                                    : deleteBlock(element),
                                            confirmation: {
                                                title: 'Supprimer',
                                                content: `Souhaitez vous supprimer l'élément "${element.title}" ?\nIl sera perdue.`,
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
