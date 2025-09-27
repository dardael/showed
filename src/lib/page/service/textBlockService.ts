import { TextBlockProperties } from '../models/textBlockProperties';

export default interface TextBlockService {
    addTextBlockToBlock(
        blockId: string,
        properties: TextBlockProperties
    ): Promise<void>;
    updateTextBlockProperties(
        blockId: string,
        textBlockId: string,
        properties: TextBlockProperties
    ): Promise<void>;
}
