import { ComponentType } from 'showed/lib/page/models/componentType';
import BlockProvider from '../../../src/lib/page/blockProvider';
import BlockRepository from '../../../src/lib/page/blockRepository';
import ComponentRepository from '../../../src/lib/page/componentRepository';
import { SortDirection } from '../../../src/lib/page/models/sortDirection';

const mockBlockRepository = {
    getBlocks: jest.fn(),
    updateBlock: jest.fn(),
    deleteBlock: jest.fn(),
    createBlock: jest.fn(),
};

const mockComponentRepository = {
    getComponents: jest.fn(),
    updateComponent: jest.fn(),
    deleteBlockComponents: jest.fn(),
};

const blockProvider = new BlockProvider(
    mockBlockRepository as unknown as BlockRepository,
    mockComponentRepository as unknown as ComponentRepository
);

describe('BlockProvider', () => {
    describe('moveChildElement', () => {
        it('should move child element up', async () => {
            const blocks = [
                {
                    _id: '1',
                    position: 1,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
            ];
            const components = [
                {
                    _id: '2',
                    position: 2,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
            ];

            mockBlockRepository.getBlocks.mockResolvedValue(blocks);
            mockComponentRepository.getComponents.mockResolvedValue(components);

            const result = await blockProvider.moveChildElement(
                components[0],
                SortDirection.UP
            );

            expect(
                mockComponentRepository.updateComponent
            ).toHaveBeenCalledWith('2', { position: 1 });
            expect(result).toEqual([
                {
                    _id: '2',
                    position: 1,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
                {
                    _id: '1',
                    position: 2,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
            ]);
        });

        it('should move child element to the top', async () => {
            const blocks = [
                {
                    _id: '1',
                    position: 1,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
            ];
            const components = [
                {
                    _id: '2',
                    position: 2,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
                {
                    _id: '3',
                    position: 3,
                    blockId: 'block1',
                    name: 'Component 2',
                    componentType: ComponentType.CALENDAR_BUTTON,
                    content: 'content2',
                    title: 'Title 2',
                },
            ];

            mockBlockRepository.getBlocks.mockResolvedValue(blocks);
            mockComponentRepository.getComponents.mockResolvedValue(components);

            const result = await blockProvider.moveChildElement(
                components[1],
                SortDirection.TOP
            );

            expect(
                mockComponentRepository.updateComponent
            ).toHaveBeenCalledWith('3', { position: 1 });
            expect(
                mockComponentRepository.updateComponent
            ).toHaveBeenCalledWith('2', { position: 3 });
            expect(result).toEqual([
                {
                    _id: '3',
                    position: 1,
                    blockId: 'block1',
                    name: 'Component 2',
                    componentType: ComponentType.CALENDAR_BUTTON,
                    content: 'content2',
                    title: 'Title 2',
                },
                {
                    _id: '1',
                    position: 2,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
                {
                    _id: '2',
                    position: 3,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
            ]);
        });

        it('should move child element to the bottom', async () => {
            const blocks = [
                {
                    _id: '1',
                    position: 1,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
            ];
            const components = [
                {
                    _id: '2',
                    position: 2,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
                {
                    _id: '3',
                    position: 3,
                    blockId: 'block1',
                    name: 'Component 2',
                    componentType: ComponentType.CALENDAR_BUTTON,
                    content: 'content2',
                    title: 'Title 2',
                },
            ];

            mockBlockRepository.getBlocks.mockResolvedValue(blocks);
            mockComponentRepository.getComponents.mockResolvedValue(components);

            const result = await blockProvider.moveChildElement(
                components[0],
                SortDirection.BOTTOM
            );

            expect(
                mockComponentRepository.updateComponent
            ).toHaveBeenCalledWith('2', { position: 3 });
            expect(
                mockComponentRepository.updateComponent
            ).toHaveBeenCalledWith('3', { position: 2 });
            expect(result).toEqual([
                {
                    _id: '1',
                    position: 1,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
                {
                    _id: '3',
                    position: 2,
                    blockId: 'block1',
                    name: 'Component 2',
                    componentType: ComponentType.CALENDAR_BUTTON,
                    content: 'content2',
                    title: 'Title 2',
                },
                {
                    _id: '2',
                    position: 3,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
            ]);
        });

        it('should move child element down', async () => {
            const blocks = [
                {
                    _id: '1',
                    position: 1,
                    parentBlockId: 'block1',
                    title: 'Block 1',
                    hasTransparentBackground: false,
                },
            ];
            const components = [
                {
                    _id: '2',
                    position: 2,
                    blockId: 'block1',
                    name: 'Component 1',
                    componentType: ComponentType.BOLD_TEXT,
                    content: 'content1',
                    title: 'Title 1',
                },
            ];

            mockBlockRepository.getBlocks.mockResolvedValue(blocks);
            mockComponentRepository.getComponents.mockResolvedValue(components);

            await expect(
                blockProvider.moveChildElement(
                    components[0],
                    SortDirection.DOWN
                )
            ).rejects.toThrow('Cannot move element down');
        });
    });
});
