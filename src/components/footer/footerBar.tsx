'use client';
import { Box, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaSquareFacebook, FaSquarePhone } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';
import LinkItem from 'showed/lib/footer/entities/link';

export default function FooterBar() {
    const linkItems = [
        new LinkItem(
            'aurel_ddr',
            'https://www.instagram.com/aurel_ddr/',
            <RiInstagramFill fontSize='xx-large' color='white' />
        ),
        new LinkItem(
            'Aurélien DIDIER',
            'https://www.facebook.com/aureliendidier26',
            <FaSquareFacebook fontSize='xx-large' color='white' />
        ),
        new LinkItem(
            'Me contacter',
            '/contact',
            <IoMdMail fontSize='xx-large' color='white' />
        ),
        new LinkItem(
            '06 35 19 80 16',
            'tel:0635198016',
            <FaSquarePhone fontSize='xx-large' color='white' />
        ),
    ];
    return (
        <Box backgroundColor={'black'} height={'100px'}>
            <Center>
                <Flex alignItems={'Center'} height={'100px'} width={'full'}>
                    <Spacer />
                    {linkItems.map((linkItem) => (
                        <Box key={linkItem.target}>
                            <Flex direction={'column'} alignItems={'Center'}>
                                <Link as={NextLink} href={linkItem.target}>
                                    {linkItem.icone}
                                </Link>
                                <Link
                                    as={NextLink}
                                    pt={1}
                                    color='white'
                                    href={linkItem.target}
                                >
                                    {linkItem.label}
                                </Link>
                            </Flex>
                            <Spacer />
                        </Box>
                    ))}
                </Flex>
            </Center>
        </Box>
    );
}
