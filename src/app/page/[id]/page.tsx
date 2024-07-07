import { Box } from '@chakra-ui/react';
import { getPages } from 'showed/controllers/page/pageController';

export default async function Page({ params }: { params: { id: string } }) {
    const response = await getPages();
    const page = response.find((page) => page._id === params.id);
    return (
        <Box padding={'40px'}>
            <div
                dangerouslySetInnerHTML={{
                    __html: page?.content ? page?.content : '',
                }}
            />
        </Box>
    );
}
