import { Box } from '@chakra-ui/react';
import { getComponents } from 'showed/controllers/page/componentController';
import { Block as BlockModel } from 'showed/lib/page/models/block';

export default async function Block({ block }: { block: BlockModel }) {
    const components = await getComponents(block._id as string);
    return (
        <Box>
            {components.map((component) => (
                <div
                    key={component._id}
                    dangerouslySetInnerHTML={{
                        __html: component.content,
                    }}
                />
            ))}
        </Box>
    );
}
