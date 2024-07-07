'use client';
import { useMediaQuery } from '@chakra-ui/react';
import LinkItem from 'showed/components/menu/entities/link';
import MobileMenuBar from 'showed/components/menu/mobileMenuBar';
import LaptopMenuBar from 'showed/components/menu/laptopMenuBar';
import { Page } from 'showed/lib/page/models/page';
export default function MenuBar({ pages }: { pages: Page[] }) {
    const linkItems = pages.map(
        (page) =>
            new LinkItem(page.title, '/page/' + page._id + '?id=' + page._id)
    );
    const [isMobile] = useMediaQuery('(max-width: 750px)');
    return (
        <>
            {isMobile ? (
                <MobileMenuBar links={linkItems} />
            ) : (
                <LaptopMenuBar links={linkItems} />
            )}
        </>
    );
}
