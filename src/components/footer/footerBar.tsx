'use client';
import { Box, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaSquareFacebook, FaSquarePhone } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';
import LinkItem from 'showed/lib/footer/entities/link';
import React from 'react';
export default function FooterBar() {
    const linkItems = [
        new LinkItem(
            'Me contacter',
            '/contact',
            <IoMdMail fontSize='xx-large' color='white' />
        ),
        new LinkItem(
            '07 49 68 22 17',
            'tel:0749682217',
            <FaSquarePhone fontSize='xx-large' color='white' />
        ),
    ];
    return (
        <Box color='#ebd2d2' backgroundColor='#a94646' height={'100px'}>
            <Center>
                <Flex alignItems={'Center'} height={'100px'} width={'full'}>
                    <Spacer />
                    {React.Children.toArray(
                        linkItems.map((linkItem) => (
                            <>
                                <Flex
                                    direction={'column'}
                                    alignItems={'Center'}
                                >
                                    <Link as={NextLink} href={linkItem.target}>
                                        {linkItem.icone}
                                    </Link>
                                    <Link
                                        as={NextLink}
                                        pt={1}
                                        href={linkItem.target}
                                        textAlign='center'
                                    >
                                        {linkItem.label}
                                    </Link>
                                </Flex>
                                <Spacer />
                            </>
                        ))
                    )}
                </Flex>
            </Center>
        </Box>
    );
}
