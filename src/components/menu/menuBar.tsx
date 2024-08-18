'use client';
import { Box, useMediaQuery } from '@chakra-ui/react';
import LinkItem from 'showed/components/menu/entities/link';
import MobileMenuBar from 'showed/components/menu/mobileMenuBar';
import LaptopMenuBar from 'showed/components/menu/laptopMenuBar';
import { Page } from 'showed/lib/page/models/page';
import { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';
export default function MenuBar({ pages }: { pages: Page[] }) {
    const { theme } = useContext(ThemeContext);
    const linkItems = pages.map(
        (page) => new LinkItem(page.title, '/page/' + page.urlPart)
    );
    const [isMobile] = useMediaQuery('(max-width: 750px)');
    return (
        <>
            {linkItems.length < 2 ? (
                <></>
            ) : (
                <Box color={'white'} backgroundColor={theme.color + '.500'}>
                    {isMobile ? (
                        <MobileMenuBar links={linkItems} />
                    ) : (
                        <LaptopMenuBar links={linkItems} />
                    )}
                </Box>
            )}
        </>
    );
}
