import { Box } from '@chakra-ui/react';
import { getPages } from 'showed/controllers/page/pageController';
import { getComponents } from 'showed/controllers/page/componentController';

export default async function Page({ params }: { params: { id: string } }) {
    const response = await getPages();
    const page = response.find((page) => page.urlPart === params.id);
    const components = await getComponents(page?._id as string);
    return (
        <Box padding={'40px'}>
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
