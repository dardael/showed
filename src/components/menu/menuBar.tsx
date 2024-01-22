'use client';
import { Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import LinkItem from 'showed/lib/menu/entities/link';

export default function MenuBar() {
    const linkItems = [
        new LinkItem('Accueil', '/'),
        new LinkItem('Coaching individuel', '/coaching'),
        new LinkItem('Programme mensuel', '/programme'),
        new LinkItem('Qui suis-je ?', '/presentation'),
        new LinkItem('Me contacter', '/contact'),
    ];
    return (
        <Center
            fontWeight='600'
            fontFamily={'system-ui'}
            bg='black'
            h='100px'
            color='white'
        >
            <Flex alignItems='center' width='full'>
                <Spacer />
                {linkItems.map((linkItem) => (
                    <>
                        <Link as={NextLink} href={linkItem.target}>
                            {linkItem.label}
                        </Link>
                        <Spacer />
                    </>
                ))}
            </Flex>
        </Center>
    );
}
