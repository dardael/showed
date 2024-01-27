'use client';
import { useMediaQuery } from '@chakra-ui/react';
import LinkItem from 'showed/lib/menu/entities/link';
import MobileMenuBar from 'showed/components/menu/mobileMenuBar';
import LaptopMenuBar from 'showed/components/menu/laptopMenuBar';
export default function MenuBar() {
    const linkItems = [
        new LinkItem('Accueil', '/'),
        new LinkItem('Coaching individuel', '/coaching'),
        new LinkItem('Programme mensuel', '/programme'),
        new LinkItem('Qui suis-je ?', '/presentation'),
        new LinkItem('Me contacter', '/contact'),
    ];
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
