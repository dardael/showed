import { Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import LinkItem from 'showed/components/menu/entities/link';
import React from 'react';

export default function LaptopMenuBar({ links }: { links: LinkItem[] }) {
    return (
        <Center
            fontWeight='600'
            fontFamily={'system-ui'}
            bg='black'
            color='white'
            h='100'
        >
            <Flex alignItems='center' width='full'>
                <Spacer />
                {React.Children.toArray(
                    links.map((linkItem) => (
                        <>
                            <Link as={NextLink} href={linkItem.target}>
                                {linkItem.label}
                            </Link>
                            <Spacer />
                        </>
                    ))
                )}
            </Flex>
        </Center>
    );
}
