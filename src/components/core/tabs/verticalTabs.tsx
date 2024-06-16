'use client';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
} from '@chakra-ui/react';

export default function VerticalTabs({
    pages,
}: {
    pages: { title: string; content: React.ReactNode }[];
}) {
    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            {pages.map((page) => (
                <AccordionItem key={page.title}>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading as='h5' size='sm'>
                                {page.title}
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>{page.content}</AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
