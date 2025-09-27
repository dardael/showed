import TextBlockServiceImpl from '../../../src/lib/page/textBlockServiceImpl';
import { ComponentType } from '../../../src/lib/page/models/componentType';
import type { Component } from '../../../src/lib/page/models/component';
import ComponentProvider from '../../../src/lib/page/componentProvider';

const mockComponentProvider = {
    createComponent: jest.fn(),
    getComponents: jest.fn(),
    updateComponent: jest.fn(),
    deleteComponent: jest.fn(),
    moveComponent: jest.fn(),
};

const textBlockService = new TextBlockServiceImpl(
    mockComponentProvider as unknown as ComponentProvider
);

describe('TextBlockService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addTextBlockToBlock', () => {
        it('should add a text block to a block', async () => {
            mockComponentProvider.getComponents.mockResolvedValue([]);
            mockComponentProvider.createComponent.mockResolvedValue({
                _id: 'mockId',
            } as Component);

            const properties = {
                textContent: 'Hello',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };

            await textBlockService.addTextBlockToBlock(
                'block1',
                properties as any
            );

            expect(mockComponentProvider.createComponent).toHaveBeenCalledWith({
                blockId: 'block1',
                componentType: ComponentType.TEXT_BLOCK,
                content: 'Hello',
                title: 'Text Block',
                position: 1,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center',
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            });
        });

        it('should set correct position when components exist', async () => {
            mockComponentProvider.getComponents.mockResolvedValue([
                { position: 1 },
                { position: 2 },
            ] as Component[]);
            mockComponentProvider.createComponent.mockResolvedValue({
                _id: 'mockId',
            } as Component);

            const properties = {
                textContent: 'Hello',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };

            await textBlockService.addTextBlockToBlock('block1', properties);

            expect(mockComponentProvider.createComponent).toHaveBeenCalledWith(
                expect.objectContaining({ position: 3 })
            );
        });
    });

    describe('updateTextBlockProperties', () => {
        it('should update text block properties', async () => {
            const component = {
                _id: 'comp1',
                position: 1,
                title: 'Text Block',
            };
            mockComponentProvider.getComponents.mockResolvedValue([
                component,
            ] as Component[]);
            mockComponentProvider.updateComponent.mockResolvedValue({
                _id: 'comp1',
            } as Component);

            const properties = {
                textContent: 'Updated',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };

            await textBlockService.updateTextBlockProperties(
                'block1',
                'comp1',
                properties
            );

            expect(mockComponentProvider.updateComponent).toHaveBeenCalledWith(
                'comp1',
                {
                    content: 'Updated',
                    position: 1,
                    title: 'Text Block',
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    fontSize: 16,
                    alignment: 'center',
                    foregroundColor: '#000000',
                    backgroundColor: '#FFFFFF',
                }
            );
        });

        it('should throw error if component not found', async () => {
            mockComponentProvider.getComponents.mockResolvedValue(
                [] as Component[]
            );

            const properties = {
                textContent: 'Updated',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 16,
                alignment: 'center' as const,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
            };

            await expect(
                textBlockService.updateTextBlockProperties(
                    'block1',
                    'comp1',
                    properties
                )
            ).rejects.toThrow('Text block not found');
        });
    });
});
