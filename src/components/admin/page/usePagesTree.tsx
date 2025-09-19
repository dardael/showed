import { useEffect, useState } from 'react';
import { TreeNode } from 'showed/components/core/tree';
import {
    createPage,
    deletePage,
    duplicatePage,
    getPagesWithChildren,
    movePage,
} from 'showed/controllers/page/pageController';
import { isPage, Page } from 'showed/lib/page/models/page';
import { Block, isBlock } from 'showed/lib/page/models/block';
import { Component, isComponent } from 'showed/lib/page/models/component';
import {
    createComponent,
    deleteComponent,
    duplicateComponent,
} from 'showed/controllers/page/componentController';
import {
    createBlock,
    deleteBlock,
    duplicateBlock,
    moveChildElement,
} from 'showed/controllers/page/blockController';
import { BlockType } from 'showed/lib/page/models/blockType';
import { ComponentType } from 'showed/lib/page/models/componentType';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import { RiCodeBlock } from 'react-icons/ri';
import { BiSolidComponent } from 'react-icons/bi';
import { FaRegFile } from 'react-icons/fa6';

export const usePagesTree = () => {
    const [selectedItem, setSelectedItem] = useState<
        Page | Block | Component | null
    >(null);
    const [pages, setPages] = useState<Page[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const updateChildrenRecursively = (
        blocks: (Block | Component)[],
        parentId: string,
        newElement: Block | Component
    ): Block[] => {
        return blocks.filter(isBlock).map((block) => {
            if (block._id === parentId) {
                return {
                    ...block,
                    children: [...(block.children || []), newElement],
                };
            }

            if (block.children) {
                return {
                    ...block,
                    children: updateChildrenRecursively(
                        block.children,
                        parentId,
                        newElement
                    ),
                };
            }

            return block;
        });
    };

    const convertChildrenToNodes = (
        elements: (Block | Component)[]
    ): TreeNode[] => {
        return elements.map((element) => {
            const node = {
                id: element._id as string,
                label: element.title,
                icon:
                    (isBlock(element) && <RiCodeBlock />) ||
                    (isComponent(element) && <BiSolidComponent />),
                children:
                    isBlock(element) && element.children
                        ? convertChildrenToNodes(element.children)
                        : [],
            };
            return node;
        });
    };

    const convertPagesToNodes = (pages: Page[]): TreeNode[] => {
        return pages.map((page) => {
            const node = {
                id: page._id || '',
                label: page.title,
                icon: <FaRegFile />,
                children: page.children
                    ? convertChildrenToNodes(page.children)
                    : [],
            };
            return node;
        });
    };

    const onPageChange = (updatedPage: Page) => {
        setPages((prevPages) => {
            return prevPages.map((page) => {
                if (page._id === updatedPage._id) {
                    updatedPage.children = page.children;
                    return updatedPage;
                }
                return page;
            });
        });
    };

    const onBlockChange = (updatedBlock: Block) => {
        const updateBlocksRecursively = (
            blocks: (Block | Component)[]
        ): (Block | Component)[] => {
            return blocks.map((block) => {
                if (block._id === updatedBlock._id) {
                    updatedBlock.children = (block as Block).children;
                    return updatedBlock;
                }
                if (isBlock(block) && block.children) {
                    block.children = updateBlocksRecursively(block.children);
                }
                return block;
            });
        };

        setPages((prevPages) => {
            return prevPages.map((page) => {
                if (page.children) {
                    page.children = updateBlocksRecursively(
                        page.children
                    ) as Block[];
                }
                return page;
            });
        });
    };

    const onNodeDeleted = async (deletedNode: TreeNode) => {
        const element = findElementById(deletedNode.id, pages);
        if (isPage(element)) {
            await deletePage(element._id as string);
        } else if (isBlock(element)) {
            await deleteBlock(element._id as string);
        } else if (isComponent(element)) {
            await deleteComponent(element._id as string);
        }

        const removeNodeRecursively = (
            elements: (Page | Block | Component)[],
            nodeId: string
        ): (Page | Block | Component)[] => {
            return elements
                .filter((element) => element._id !== nodeId)
                .map((element) => {
                    if (
                        !isComponent(element) &&
                        Array.isArray(element.children)
                    ) {
                        element.children = removeNodeRecursively(
                            element.children,
                            nodeId
                        ) as (Block | Component)[];
                    }
                    return element;
                });
        };

        setPages(
            (prevPages) =>
                removeNodeRecursively(prevPages, deletedNode.id) as Page[]
        );
    };

    const onComponentChange = (updatedComponent: Component) => {
        const updateComponentsRecursively = (
            elements: (Block | Component)[]
        ): (Block | Component)[] => {
            return elements.map((element) => {
                if (element._id === updatedComponent._id) {
                    return updatedComponent;
                }
                if (isBlock(element) && element.children) {
                    element.children = updateComponentsRecursively(
                        element.children
                    );
                }
                return element;
            });
        };

        setPages((prevPages) => {
            return prevPages.map((page) => {
                if (page.children) {
                    page.children = updateComponentsRecursively(
                        page.children
                    ) as Block[];
                }
                return page;
            });
        });
    };

    useEffect(() => {
        getPagesWithChildren().then((pages) => {
            setPages(pages);
            setIsLoading(false);
        });
    }, []);

    const findElementById = (
        id: string,
        elements: (Page | Block | Component)[]
    ): Page | Block | Component | null => {
        for (const element of elements) {
            if (element._id === id) {
                return element;
            }

            if ('children' in element && Array.isArray(element.children)) {
                const childrenElements = element.children;
                const found = findElementById(id, childrenElements);
                if (found) {
                    return found;
                }
            }
        }

        return null;
    };

    const handleNodeClick = (node: TreeNode) => {
        const foundItem = findElementById(node.id, pages);
        setSelectedItem(foundItem);
    };

    const addNewBlockToPage = async (page: Page, blockType: BlockType) => {
        const newBlock = await createBlock(
            (page.children || []).length + 1,
            page._id as string,
            undefined,
            blockType
        );
        setPages((prevPages) => {
            return prevPages.map((p) => {
                if (p._id === page._id) {
                    const updatedChildren = [...(p.children || []), newBlock];
                    return { ...p, children: updatedChildren };
                }
                return p;
            });
        });
    };

    const addNewBlocktoBlock = async (
        parentBlock: Block,
        blockType: BlockType
    ) => {
        const newBlock = await createBlock(
            (parentBlock.children || []).length + 1,
            undefined,
            parentBlock._id as string,
            blockType
        );

        setPages((prevPages) => {
            return prevPages.map((page) => {
                if (page.children) {
                    return {
                        ...page,
                        children: updateChildrenRecursively(
                            page.children,
                            parentBlock._id as string,
                            newBlock
                        ),
                    };
                }
                return page;
            });
        });
    };

    const updateChildrens = (elements: (Block | Component)[]) => {
        setPages((prevPages) => {
            const updatedPages = prevPages.map((page) => {
                if (!page.children) return page;

                const updateChildren = (
                    children: (Block | Component)[]
                ): (Block | Component)[] => {
                    return children.map((child) => {
                        const movedElement = elements.find(
                            (m) => m._id === child._id
                        );

                        let newChild = child;
                        if (movedElement) {
                            newChild = {
                                ...movedElement,
                                children: isBlock(child)
                                    ? child.children
                                    : undefined,
                            };
                        }

                        if (isBlock(newChild) && newChild.children) {
                            newChild = {
                                ...newChild,
                                children: updateChildren(
                                    newChild.children
                                ).sort((a, b) => a.position - b.position),
                            };
                        }

                        return newChild;
                    });
                };

                return {
                    ...page,
                    children: updateChildren(page.children).sort(
                        (a, b) => a.position - b.position
                    ) as Block[],
                };
            });

            return updatedPages;
        });
    };

    const addNewComponent = async (
        parentBlock: Block,
        componentType: ComponentType
    ) => {
        const newComponent = await createComponent(
            parentBlock._id as string,
            componentType,
            parentBlock.children ? parentBlock.children.length + 1 : 1
        );

        setPages((prevPages) => {
            return prevPages.map((page) => {
                if (page.children) {
                    return {
                        ...page,
                        children: updateChildrenRecursively(
                            page.children,
                            parentBlock._id as string,
                            newComponent
                        ),
                    };
                }
                return page;
            });
        });
    };

    const onNodeReorder = async (
        movedNode: TreeNode,
        direction: SortDirection
    ) => {
        const element = findElementById(movedNode.id, pages);
        if (isPage(element)) {
            const movedPages = await movePage(element, direction);
            setPages((prevPages) => {
                const movedPagesMap = new Map(
                    movedPages.map((page) => [page._id, page])
                );
                return prevPages
                    .map((page) => {
                        const movedPage = movedPagesMap.get(page._id);
                        if (movedPage) {
                            return { ...movedPage, children: page.children };
                        }
                        return page;
                    })
                    .sort((a, b) => a.position - b.position);
            });
        } else if (isBlock(element) && element.pageId) {
            const movedBlocks = await moveChildElement(element, direction);
            updateChildrens(movedBlocks);
        } else {
            const movedElements = await moveChildElement(
                element as Block | Component,
                direction
            );
            updateChildrens(movedElements);
        }
    };

    const onPageCreated = async () => {
        const page = await createPage(pages.length + 1);
        setPages([...pages, page]);
    };

    const onNodePasted = async (
        pastedNode: TreeNode,
        target: TreeNode | null
    ) => {
        const element = findElementById(pastedNode.id, pages);
        const targetElement = target ? findElementById(target.id, pages) : null;
        if (isPage(element) && !target) {
            const newPage = await duplicatePage(element, pages.length + 1);
            setPages([...pages, newPage]);
        } else if (
            isBlock(element) &&
            targetElement &&
            (isPage(targetElement) || isBlock(targetElement))
        ) {
            const newBlock = await duplicateBlock(
                element as Block,
                targetElement
            );
            targetElement.children = targetElement.children || [];
            targetElement.children.push(newBlock);
            if (isPage(targetElement)) {
                onPageChange(targetElement);
            } else {
                onBlockChange(targetElement);
            }
        } else if (
            isComponent(element) &&
            targetElement &&
            isBlock(targetElement)
        ) {
            const newComponent = await duplicateComponent(
                element,
                targetElement
            );
            targetElement.children = targetElement.children || [];
            targetElement.children.push(newComponent);
            onBlockChange(targetElement);
        }
    };

    return {
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
    };
};
