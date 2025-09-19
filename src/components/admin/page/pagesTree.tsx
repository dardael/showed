import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Tree from 'showed/components/core/tree';
import { isPage } from 'showed/lib/page/models/page';
import { isBlock } from 'showed/lib/page/models/block';
import { isComponent } from 'showed/lib/page/models/component';
import Loading from 'showed/components/core/feedback/loading';
import PageData from 'showed/components/admin/page/pageData';
import BlockData from 'showed/components/admin/page/block/blockData';
import ComponentData from 'showed/components/admin/page/component/componentData';
import { BlockType } from 'showed/lib/page/models/blockType';
import { ComponentType } from 'showed/lib/page/models/componentType';
import dynamic from 'next/dynamic';
import { usePagesTree } from './usePagesTree';
import AddBlockDropdown from './addBlockDropdown';
import AddComponentDropdown from './addComponentDropdown';

const Preview = dynamic(() => import('showed/components/admin/page/preview'), {
    ssr: true,
});
const PagesTree = () => {
    const {
        selectedItem,
        pages,
        isLoading,
        convertPagesToNodes,
        handleNodeClick,
        onNodeDeleted,
        onNodeReorder,
        onPageCreated,
        onNodePasted,
        onPageChange,
        onBlockChange,
        onComponentChange,
        addNewBlockToPage,
        addNewBlocktoBlock,
        addNewComponent,
    } = usePagesTree();

    return (
        <Flex direction='column'>
            <Flex flex={1}>
                <Box
                    width='30%'
                    minWidth={'500px'}
                    borderRight='1px solid #ccc'
                    p={4}
                >
                    <Loading isLoading={isLoading}>
                        <Tree
                            data={convertPagesToNodes(pages)}
                            onNodeClick={handleNodeClick}
                            onNodeDeleted={onNodeDeleted}
                            onNodeReorder={onNodeReorder}
                            onRootNodeCreated={onPageCreated}
                            onNodePasted={onNodePasted}
                            selectedNodeId={selectedItem?._id}
                        />
                    </Loading>
                </Box>
                <Box flex={1} p={4}>
                    {selectedItem && isPage(selectedItem) && (
                        <Flex direction='column' gap={'10px'}>
                            <Flex direction={'row-reverse'} gap={'10px'}>
                                <AddBlockDropdown
                                    label={'Ajouter un block'}
                                    onSelectedItem={(key) =>
                                        addNewBlockToPage(selectedItem, key)
                                    }
                                    items={[
                                        BlockType.VERTICAL,
                                        BlockType.HORIZONTAL,
                                        BlockType.INVITATION,
                                        BlockType.PRODUCTS,
                                    ]}
                                />
                            </Flex>
                            <PageData
                                page={selectedItem}
                                onPageChange={onPageChange}
                            />
                        </Flex>
                    )}
                    {selectedItem && isBlock(selectedItem) && (
                        <Flex direction='column' gap={'10px'}>
                            <Flex direction={'row-reverse'} gap={'10px'}>
                                {selectedItem.parentBlockId ||
                                [
                                    BlockType.HORIZONTAL,
                                    BlockType.VERTICAL,
                                    BlockType.LINKED,
                                ].indexOf(selectedItem.blockType as BlockType) <
                                    0 ? (
                                    <></>
                                ) : (
                                    <AddBlockDropdown
                                        label={'Ajouter un sous-block'}
                                        onSelectedItem={(key) =>
                                            addNewBlocktoBlock(
                                                selectedItem,
                                                key
                                            )
                                        }
                                        items={[
                                            BlockType.VERTICAL,
                                            BlockType.HORIZONTAL,
                                            BlockType.LINKED,
                                        ]}
                                    />
                                )}
                                {selectedItem.blockType ===
                                    BlockType.LINKED && (
                                    <AddComponentDropdown
                                        label={'Ajouter un texte'}
                                        onSelectedItem={(key) =>
                                            addNewComponent(selectedItem, key)
                                        }
                                        items={[ComponentType.RICH_TEXT_EDITOR]}
                                    />
                                )}
                                {(selectedItem.blockType ===
                                    BlockType.VERTICAL ||
                                    selectedItem.blockType ===
                                        BlockType.HORIZONTAL) && (
                                    <>
                                        <AddComponentDropdown
                                            label={'Ajouter un composant'}
                                            onSelectedItem={(key) =>
                                                addNewComponent(
                                                    selectedItem,
                                                    key
                                                )
                                            }
                                            items={[
                                                ComponentType.MAP,
                                                ComponentType.COUNTDOWN,
                                                ComponentType.SPACER,
                                            ]}
                                        />
                                        <AddComponentDropdown
                                            label={'Ajouter un bouton'}
                                            onSelectedItem={(key) =>
                                                addNewComponent(
                                                    selectedItem,
                                                    key
                                                )
                                            }
                                            items={[
                                                ComponentType.CALENDAR_BUTTON,
                                                ComponentType.POSITION_BUTTON,
                                                ComponentType.PAGE_LINK_BUTTON,
                                            ]}
                                        />
                                        <AddComponentDropdown
                                            label={'Ajouter une image'}
                                            onSelectedItem={(key) =>
                                                addNewComponent(
                                                    selectedItem,
                                                    key
                                                )
                                            }
                                            items={[
                                                ComponentType.ICON,
                                                ComponentType.ROUND_PHOTO,
                                                ComponentType.STAINED_GLASS_PHOTO,
                                            ]}
                                        />
                                        <AddComponentDropdown
                                            label={'Ajouter un texte'}
                                            onSelectedItem={(key) =>
                                                addNewComponent(
                                                    selectedItem,
                                                    key
                                                )
                                            }
                                            items={[
                                                ComponentType.TEXT,
                                                ComponentType.ITALIC_TEXT,
                                                ComponentType.BOLD_TEXT,
                                                ComponentType.UNDERLINED_ABOVELINED_TEXT,
                                                ComponentType.HEADER,
                                                ComponentType.ITALIC_HEADER,
                                                ComponentType.HEADER_WITH_COLORED_BACKGROUND,
                                                ComponentType.RICH_TEXT_EDITOR,
                                            ]}
                                        />
                                    </>
                                )}
                            </Flex>
                            <BlockData
                                block={selectedItem}
                                onBlockChange={onBlockChange}
                            />
                        </Flex>
                    )}
                    {selectedItem && isComponent(selectedItem) && (
                        <ComponentData
                            component={selectedItem}
                            onSave={onComponentChange}
                        />
                    )}
                </Box>
            </Flex>
            <Box borderTop='1px solid #ccc'>
                <Box overflow='auto'>
                    {selectedItem && <Preview element={selectedItem} />}
                </Box>
            </Box>
        </Flex>
    );
};

export default PagesTree;
