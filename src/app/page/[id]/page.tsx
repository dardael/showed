import { Box } from '@chakra-ui/react';
import Block from 'showed/components/page/block';
import { getBlocks } from 'showed/controllers/page/blockController';
import { getPages } from 'showed/controllers/page/pageController';

export default async function Page({ params }: { params: { id: string } }) {
    const response = await getPages();
    const page = response.find((page) => page.urlPart === params.id);
    const blocks = await getBlocks(page?._id as string);
    return (
        <Box>
            {blocks.map((block) => (
                <Block key={block._id as string} block={block} />
            ))}
        </Box>
    );
}
