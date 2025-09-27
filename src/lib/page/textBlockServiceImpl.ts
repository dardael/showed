import TextBlockService from './service/textBlockService';
import { TextBlockProperties } from './models/textBlockProperties';
import ComponentProvider from './componentProvider';
import { ComponentType } from './models/componentType';

export default class TextBlockServiceImpl implements TextBlockService {
    constructor(private componentProvider: ComponentProvider) {}

    async addTextBlockToBlock(
        blockId: string,
        properties: TextBlockProperties
    ): Promise<void> {
        // Get the current components to determine position
        const components = await this.componentProvider.getComponents(blockId);
        const position = components.length + 1;

        await this.componentProvider.createComponent({
            blockId,
            componentType: ComponentType.TEXT_BLOCK,
            content: properties.textContent,
            title: 'Text Block', // Default title
            position,
            fontFamily: properties.fontFamily,
            fontWeight: properties.fontWeight,
            fontSize: properties.fontSize,
            alignment: properties.alignment,
            foregroundColor: properties.foregroundColor,
            backgroundColor: properties.backgroundColor,
        });
    }

    async updateTextBlockProperties(
        blockId: string,
        textBlockId: string,
        properties: TextBlockProperties
    ): Promise<void> {
        // Find the component and get its current position
        const components = await this.componentProvider.getComponents(blockId);
        const component = components.find((c) => c._id === textBlockId);
        if (!component) {
            throw new Error('Text block not found');
        }

        await this.componentProvider.updateComponent(textBlockId, {
            content: properties.textContent,
            position: component.position,
            title: component.title,
            fontFamily: properties.fontFamily,
            fontWeight: properties.fontWeight,
            fontSize: properties.fontSize,
            alignment: properties.alignment,
            foregroundColor: properties.foregroundColor,
            backgroundColor: properties.backgroundColor,
        });
    }
}
