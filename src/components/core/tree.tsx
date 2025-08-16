import React, { useState, useContext } from 'react';
import { Box, Flex, Text, IconButton, BoxProps, Input } from '@chakra-ui/react';
import {
    FaChevronDown,
    FaChevronRight,
    FaArrowUp,
    FaArrowDown,
    FaAngleDoubleUp,
    FaAngleDoubleDown,
    FaCopy,
    FaCut,
    FaPaste,
    FaTrash,
} from 'react-icons/fa';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import { FaPlus } from 'react-icons/fa6';
import { ThemeContext } from 'showed/app/providers';

export type TreeNode = {
    id: string;
    label: string;
    children?: TreeNode[];
    isSelected?: boolean;
    icon?: React.ReactNode;
    isExpanded?: boolean;
};

type TreeProps = {
    data: TreeNode[];
    onRootNodeCreated?: () => void;
    onNodeClick?: (node: TreeNode) => void;
    onNodeReorder?: (updatedNode: TreeNode, direction: SortDirection) => void;
    onNodeDeleted?: (deletedNode: TreeNode) => void;
    onNodePasted?: (pastedNode: TreeNode, targetNode: TreeNode | null) => void;
    selectedNodeId?: string | null;
} & BoxProps;

const hasMatchingDescendants = (
    nodes: TreeNode[],
    searchText: string
): boolean => {
    return nodes.some(
        (node) =>
            node.label.toLowerCase().includes(searchText.toLowerCase()) ||
            (node.children && hasMatchingDescendants(node.children, searchText))
    );
};

const Tree: React.FC<TreeProps> = ({
    data,
    selectedNodeId = null,
    onRootNodeCreated,
    onNodeClick,
    onNodePasted,
    onNodeDeleted,
    onNodeReorder,
    ...props
}) => {
    const handleNodeReorder = (node: TreeNode, direction: SortDirection) => {
        onNodeReorder?.(node, direction);
    };
    const filterTree = (nodes: TreeNode[]): TreeNode[] => {
        return nodes
            .filter(
                (node) =>
                    node.label
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    (node.children && filterTree(node.children).length > 0)
            )
            .map((node) => ({
                ...node,
                children: node.children ? filterTree(node.children) : undefined,
            }));
    };

    const [searchText, setSearchText] = useState('');
    const [copiedNode, setCopiedNode] = useState<TreeNode | null>(null);

    const pasteNodeAsRoot = (node: TreeNode) => {
        onNodePasted?.(node, null);
    };

    return (
        <Box {...props}>
            <Flex mb={4}>
                <Input
                    placeholder='Rechercher...'
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    flex='1'
                />
                <IconButton
                    size='sm'
                    icon={<FaPaste />}
                    aria-label='Paste Node as Root'
                    onClick={() => {
                        if (copiedNode) pasteNodeAsRoot(copiedNode);
                    }}
                    ml={2}
                    marginTop={'5px'}
                    isDisabled={!copiedNode}
                />
                <IconButton
                    size='sm'
                    icon={<FaPlus />}
                    aria-label='Create root node'
                    onClick={onRootNodeCreated}
                    ml={2}
                    marginTop={'5px'}
                />
            </Flex>
            {filterTree(data).map((node) => (
                <TreeNodeComponent
                    key={node.id}
                    node={node}
                    selectedNodeId={selectedNodeId}
                    searchText={searchText}
                    data={filterTree(data)}
                    onNodeReorder={handleNodeReorder}
                    onNodeClick={(clickedNode) => {
                        onNodeClick?.(clickedNode);
                    }}
                    copiedNode={copiedNode}
                    onNodePaste={(node: TreeNode) => {
                        if (copiedNode) {
                            onNodePasted?.(copiedNode, node);
                        }
                    }}
                    onNodeCopied={(node: TreeNode) => setCopiedNode(node)}
                    onNodeCut={(node: TreeNode) => {
                        setCopiedNode(node);
                        onNodeDeleted?.(node);
                    }}
                    onNodeDeleted={(node: TreeNode) => {
                        onNodeDeleted?.(node);
                    }}
                />
            ))}
        </Box>
    );
};

type TreeNodeProps = {
    node: TreeNode;
    onNodeClick?: (node: TreeNode) => void;
    selectedNodeId: string | null;
};

const isNodeAtBoundary = (
    node: TreeNode,
    data: TreeNode[],
    boundary: 'first' | 'last'
): boolean => {
    const findParentNode = (
        nodes: TreeNode[],
        targetNodeId: string
    ): TreeNode | null => {
        for (const currentNode of nodes) {
            if (
                currentNode.children?.some((child) => child.id === targetNodeId)
            ) {
                return currentNode;
            }
            if (currentNode.children) {
                const parent = findParentNode(
                    currentNode.children,
                    targetNodeId
                );
                if (parent) return parent;
            }
        }
        return null;
    };

    const parentNode = findParentNode(data, node.id);

    if (!parentNode || !parentNode.children) {
        const rootNodes = data.filter(
            (item) => !data.some((parent) => parent.children?.includes(item))
        );
        const nodeIndex = rootNodes.findIndex((root) => root.id === node.id);
        return boundary === 'first'
            ? nodeIndex === 0
            : nodeIndex === rootNodes.length - 1;
    }

    const index = parentNode.children.findIndex(
        (child) => child.id === node.id
    );
    return boundary === 'first'
        ? index === 0
        : index === parentNode.children.length - 1;
};

const TreeNodeComponent: React.FC<
    TreeNodeProps & {
        searchText?: string;
        data: TreeNode[];
        onNodeReorder: (node: TreeNode, direction: SortDirection) => void;
        onNodePaste: (node: TreeNode) => void;
        onNodeCopied: (node: TreeNode) => void;
        onNodeCut: (node: TreeNode) => void;
        onNodeDeleted: (node: TreeNode) => void;
        copiedNode: TreeNode | null;
    }
> = ({
    onNodePaste,
    onNodeCut,
    onNodeCopied,
    onNodeDeleted,
    copiedNode,
    node,
    selectedNodeId,
    onNodeClick,
    searchText = '',
    data,
    onNodeReorder = () => {},
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldAutoExpand =
        searchText !== '' &&
        node.children &&
        node.children.some(
            (child) =>
                child.label.toLowerCase().includes(searchText.toLowerCase()) ||
                (child.children &&
                    hasMatchingDescendants(child.children, searchText))
        );

    const isExpandedOrAutoExpand = isExpanded || shouldAutoExpand;
    const { theme } = useContext(ThemeContext);
    return (
        <Box pl={4} py={1}>
            <Flex
                align='center'
                position='relative'
                _hover={{ '.node-icons': { visibility: 'visible' } }}
            >
                <Flex
                    align='center'
                    className='node-icons'
                    position='absolute'
                    right='0'
                    visibility='hidden'
                >
                    {searchText === '' && (
                        <>
                            <IconButton
                                size='sm'
                                icon={<FaArrowUp />}
                                aria-label='Move Up'
                                onClick={() =>
                                    onNodeReorder(node, SortDirection.UP)
                                }
                                variant='ghost'
                                isDisabled={isNodeAtBoundary(
                                    node,
                                    data,
                                    'first'
                                )}
                            />
                            <IconButton
                                size='sm'
                                icon={<FaArrowDown />}
                                aria-label='Move Down'
                                onClick={() =>
                                    onNodeReorder(node, SortDirection.DOWN)
                                }
                                variant='ghost'
                                isDisabled={isNodeAtBoundary(
                                    node,
                                    data,
                                    'last'
                                )}
                            />
                            <IconButton
                                size='sm'
                                icon={<FaAngleDoubleUp />}
                                aria-label='Move to Top'
                                onClick={() =>
                                    onNodeReorder(node, SortDirection.TOP)
                                }
                                variant='ghost'
                                isDisabled={isNodeAtBoundary(
                                    node,
                                    data,
                                    'first'
                                )}
                            />
                            <IconButton
                                size='sm'
                                icon={<FaAngleDoubleDown />}
                                aria-label='Move to Bottom'
                                onClick={() =>
                                    onNodeReorder(node, SortDirection.BOTTOM)
                                }
                                variant='ghost'
                                isDisabled={isNodeAtBoundary(
                                    node,
                                    data,
                                    'last'
                                )}
                            />
                            <>
                                <IconButton
                                    size='sm'
                                    icon={<FaCopy />}
                                    aria-label='Copy Node'
                                    onClick={() => onNodeCopied(node)}
                                    variant='ghost'
                                />
                                <IconButton
                                    size='sm'
                                    icon={<FaCut />}
                                    aria-label='Cut Node'
                                    onClick={() => {
                                        onNodeCut(node);
                                    }}
                                    variant='ghost'
                                />
                                <IconButton
                                    size='sm'
                                    icon={<FaPaste />}
                                    aria-label='Paste Node'
                                    onClick={() => onNodePaste(node)}
                                    variant='ghost'
                                    isDisabled={!copiedNode}
                                />
                                <IconButton
                                    size='sm'
                                    icon={<FaTrash />}
                                    aria-label='Delete Node'
                                    onClick={() => onNodeDeleted(node)}
                                    variant='ghost'
                                />
                            </>
                        </>
                    )}
                </Flex>
                {node.children && node.children.length > 0 && (
                    <IconButton
                        color={
                            selectedNodeId === node.id
                                ? theme.color + '.500'
                                : 'black'
                        }
                        size='sm'
                        icon={
                            isExpanded ? <FaChevronDown /> : <FaChevronRight />
                        }
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant='ghost'
                    />
                )}
                {(!node.children || node.children.length === 0) && (
                    <Box marginLeft={'32px'}></Box>
                )}
                {node.icon && (
                    <Box
                        marginRight='8px'
                        color={
                            selectedNodeId === node.id
                                ? theme.color + '.500'
                                : 'black'
                        }
                    >
                        {node.icon}
                    </Box>
                )}

                <Text
                    onClick={() => {
                        onNodeClick?.(node);
                    }}
                    color={
                        selectedNodeId === node.id
                            ? theme.color + '.500'
                            : 'black'
                    }
                >
                    {node.label}
                </Text>
            </Flex>
            {isExpandedOrAutoExpand && node.children && (
                <Box pl={4}>
                    {node.children.map((childNode) => (
                        <TreeNodeComponent
                            key={childNode.id}
                            node={childNode}
                            onNodeClick={onNodeClick}
                            selectedNodeId={selectedNodeId}
                            searchText={searchText}
                            data={data}
                            onNodeReorder={onNodeReorder}
                            onNodePaste={onNodePaste}
                            onNodeCopied={onNodeCopied}
                            onNodeCut={onNodeCut}
                            onNodeDeleted={onNodeDeleted}
                            copiedNode={copiedNode}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Tree;
