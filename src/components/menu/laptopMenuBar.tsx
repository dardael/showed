import { Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import LinkItem from 'showed/components/menu/entities/link';
import React, { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';
import Image from '../core/image';

export default function LaptopMenuBar({ links }: { links: LinkItem[] }) {
    const { theme } = useContext(ThemeContext);
    return (
        <Center fontWeight='600' fontFamily={'system-ui'} h='100'>
            {theme.logoImageId && (
                <Image
                    fileId={theme.logoImageId}
                    alt='Logo'
                    style={{
                        height: '90px',
                        marginRight: '20px',
                        marginLeft: '20px',
                    }}
                />
            )}
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
