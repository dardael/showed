import { Box } from '@chakra-ui/react';
import { getPage } from 'showed/controllers/page/pageController';

export default async function Home() {
    const homePage = await getPage();
    return (
        <Box padding={'40px'}>
            <div
                dangerouslySetInnerHTML={{
                    __html: homePage?.content ? homePage?.content : '',
                }}
            />
        </Box>
    );
}
