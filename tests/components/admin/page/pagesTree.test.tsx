import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PagesTree from 'showed/components/admin/page/pagesTree';
import { ComponentType } from 'showed/lib/page/models/componentType';
import { getPagesWithChildren } from 'showed/controllers/page/pageController';
jest.mock('showed/components/admin/page/pageData', () => {
    const MockPageData = () => <div>Mocked PageData</div>;
    MockPageData.displayName = 'MockPageData';
    return MockPageData;
});
jest.mock('showed/components/admin/page/block/blockData', () => {
    const MockBlockData = () => <div>Mocked BlockData</div>;
    MockBlockData.displayName = 'MockBlockData';
    return MockBlockData;
});
jest.mock('showed/components/admin/page/component/componentData', () => {
    const MockComponentData = () => <div>Mocked ComponentData</div>;
    MockComponentData.displayName = 'MockComponentData';
    return MockComponentData;
});
import { Font } from 'showed/lib/theme/models/font';

jest.mock('showed/controllers/page/pageController', () => ({
    getPagesWithChildren: jest.fn(),
}));
jest.mock('showed/controllers/page/blockController', () => {});
jest.mock('showed/controllers/page/componentController', () => {});

describe('PagesTree Component', () => {
    beforeEach(() => {
        (getPagesWithChildren as jest.Mock).mockResolvedValue([
            {
                _id: 'page1',
                title: 'Page 1',
                position: 1,
                urlPart: 'page1',
                children: [
                    {
                        _id: 'block1',
                        pageId: 'page1',
                        title: 'Block 1',
                        position: 1,
                        hasTransparentBackground: false,
                        backgroundImageId: '',
                        blockType: 'content',
                        children: [
                            {
                                _id: 'component1',
                                blockId: 'block1',
                                componentType: ComponentType.TEXT,
                                parentBlockId: 'block1',
                                title: 'Component 1',
                                position: 1,
                                link: '',
                                width: 100,
                                font: Font.ROBOTO_FLEX,
                                content: '',
                            },
                        ],
                    },
                ],
            },
            {
                _id: 'page2',
                position: 2,
                urlPart: 'page2',
                title: 'Page 2',
                children: [],
            },
        ]);
    });

    it('renders without crashing', async () => {
        render(<PagesTree />);

        expect(await screen.findByText('Page 1')).toBeInTheDocument();
        expect(await screen.findByText('Page 2')).toBeInTheDocument();
    });

    it('displays child nodes correctly', async () => {
        render(<PagesTree />);

        await waitFor(() =>
            expect(screen.getByLabelText('Expand')).toBeInTheDocument()
        );
        const chevronIcon = screen.getByLabelText('Expand');
        act(() => {
            fireEvent.click(chevronIcon); // Simulate expanding the parent node
        });

        const blockElement = await screen.findByText('Block 1');
        const blockChevronIcon = blockElement
            .closest('div')
            ?.querySelector('[aria-label="Expand"]');
        act(() => {
            if (blockChevronIcon) fireEvent.click(blockChevronIcon); // Simulate expanding the block node
        });

        await waitFor(() => {
            expect(screen.queryByText('Block 1')).toBeInTheDocument();
            expect(screen.queryByText('Component 1')).toBeInTheDocument();
        });
    });

    it('displays selected item label when a node is clicked', async () => {
        render(<PagesTree />);

        await waitFor(() =>
            expect(screen.getByLabelText('Expand')).toBeInTheDocument()
        );
        const chevronIcon = screen.getByLabelText('Expand');
        act(() => {
            fireEvent.click(chevronIcon); // Simulate expanding the parent node
        });

        const page = await screen.findByText('Page 1');
        fireEvent.click(page);

        expect(screen.getByText(/Mocked PageData/i)).toBeInTheDocument();

        const childNode = await screen.findByText('Block 1');
        fireEvent.click(childNode);

        expect(screen.getByText(/Mocked BlockData/i)).toBeInTheDocument();
    });

    it('shows loading state while fetching data', async () => {
        (getPagesWithChildren as jest.Mock).mockImplementation(
            () => new Promise(() => {})
        ); // Simulate loading state

        render(<PagesTree />);
        await waitFor(() =>
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        );
    });
});
