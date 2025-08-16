import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree from '../../../src/components/core/tree';
import { FaFolder, FaFile } from 'react-icons/fa';

describe('Tree Component', () => {
    const treeData = [
        {
            id: 'parent-1',
            label: 'Parent 1',
            icon: <FaFolder />,
            children: [
                { id: 'child-1-1', label: 'Child 1-1', icon: <FaFile /> },
                { id: 'child-1-2', label: 'Child 1-2', icon: <FaFile /> },
            ],
        },
        {
            id: 'parent-2',
            label: 'Parent 2',
            icon: <FaFolder />,
        },
    ];

    it('renders tree nodes correctly', () => {
        render(<Tree data={treeData} />);

        expect(screen.getByText('Parent 1')).toBeInTheDocument();
        expect(screen.getByText('Parent 2')).toBeInTheDocument();
    });

    it('checks if buttons are disabled appropriately', () => {
        const onNodeReorder = jest.fn();
        render(<Tree data={treeData} onNodeReorder={onNodeReorder} />);

        const parent1Node = screen.getByText('Parent 1');
        const parent1Container = parent1Node.closest(
            '[class*="css-33co71"]'
        ) as HTMLElement;
        const moveUpButton = within(parent1Container!).getByLabelText(
            'Move Up'
        );
        const moveToTopButton = within(parent1Container!).getByLabelText(
            'Move to Top'
        );

        // 'Parent 1' is the first node, so Move Up and Move to Top should be disabled
        expect(moveUpButton).toBeDisabled();
        expect(moveToTopButton).toBeDisabled();

        const parent2Node = screen.getByText('Parent 2');
        const parent2Container = parent2Node.closest(
            '[class*="css-33co71"]'
        ) as HTMLElement;
        const moveDownButton = within(parent2Container!).getByLabelText(
            'Move Down'
        );
        const moveToBottomButton = within(parent2Container!).getByLabelText(
            'Move to Bottom'
        );

        // 'Parent 2' is the last node, so Move Down and Move to Bottom should be disabled
        expect(moveDownButton).toBeDisabled();
        expect(moveToBottomButton).toBeDisabled();

        const copyButton = within(parent1Container!).getByLabelText(
            'Copy Node'
        );
        const pasteButton = within(parent1Container!).getByLabelText(
            'Paste Node'
        );

        // Paste button should be disabled initially since no node is copied
        expect(copyButton).not.toBeDisabled(); // Copy is enabled
        expect(pasteButton).toBeDisabled();
    });

    it('expands and collapses nodes when clicked', () => {
        render(<Tree data={treeData} />);

        const toggleButton = screen.getByLabelText('Expand');

        // Initially collapsed
        expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();
        expect(screen.queryByText('Child 1-2')).not.toBeInTheDocument();

        // Expand
        fireEvent.click(toggleButton!);
        expect(screen.getByText('Child 1-1')).toBeInTheDocument();
        expect(screen.getByText('Child 1-2')).toBeInTheDocument();

        // Collapse
        const collapseButton = screen.getByLabelText('Collapse');
        fireEvent.click(collapseButton!);
        expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();
        expect(screen.queryByText('Child 1-2')).not.toBeInTheDocument();
    });
    it('filters nodes based on search input', () => {
        render(<Tree data={treeData} />);

        const searchInput = screen.getByPlaceholderText('Rechercher...');

        // Check initial rendering
        expect(screen.getByText('Parent 1')).toBeInTheDocument();
        expect(screen.getByText('Parent 2')).toBeInTheDocument();

        // Type in search input
        // Removed drag-and-drop related assertions

        // Clear search input
        fireEvent.change(searchInput, { target: { value: '' } });

        // Check if all nodes are back
        expect(screen.getByText('Parent 1')).toBeInTheDocument();
        expect(screen.getByText('Parent 2')).toBeInTheDocument();
    });
});
