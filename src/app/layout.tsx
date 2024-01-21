import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import MenuBar from 'showed/components/menu/menuBar';
import { Box, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaSquareFacebook, FaSquarePhone } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';

export const metadata: Metadata = {
    title: 'Showed',
    description: 'Publicity web app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='fr'>
            <body>
                <Providers>
                    <Box height={'100vh'}>
                        <MenuBar />
                        <Box
                            height={'calc(100% - 100px)'}
                            overflowY={'auto'}
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '16px',
                                    height: '16px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background:
                                        'linear-gradient(90deg,#434343,#434343 1px,#111 0,#111)',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#434343',
                                    borderRadius: '18px',
                                },
                            }}
                        >
                            {children}
                            <Box backgroundColor={'black'} height={'100px'}>
                                <Center>
                                    <Flex
                                        alignItems={'Center'}
                                        height={'100px'}
                                        width={'full'}
                                    >
                                        <Spacer />
                                        <Flex
                                            direction={'column'}
                                            alignItems={'Center'}
                                        >
                                            <Link
                                                href={
                                                    'https://www.instagram.com/aurel_ddr/'
                                                }
                                            >
                                                <RiInstagramFill
                                                    fontSize='xx-large'
                                                    color='white'
                                                />
                                            </Link>
                                            <Link
                                                pt={1}
                                                color='white'
                                                href={
                                                    'https://www.instagram.com/aurel_ddr/'
                                                }
                                            >
                                                aurel_ddr
                                            </Link>
                                        </Flex>
                                        <Spacer />
                                        <Flex
                                            direction={'column'}
                                            alignItems={'Center'}
                                        >
                                            <Link
                                                href={
                                                    'https://www.facebook.com/aureliendidier26'
                                                }
                                            >
                                                <FaSquareFacebook
                                                    fontSize='xx-large'
                                                    color='white'
                                                />
                                            </Link>
                                            <Link
                                                pt={1}
                                                color='white'
                                                href={
                                                    'https://www.facebook.com/aureliendidier26'
                                                }
                                            >
                                                Aurélien DIDIER
                                            </Link>
                                        </Flex>
                                        <Spacer />
                                        <Flex
                                            direction={'column'}
                                            alignItems={'Center'}
                                        >
                                            <Link
                                                as={NextLink}
                                                href={'/contact'}
                                            >
                                                <IoMdMail
                                                    fontSize='xx-large'
                                                    color='white'
                                                />
                                            </Link>
                                            <Link
                                                pt={1}
                                                color='white'
                                                as={NextLink}
                                                href='/contact'
                                            >
                                                Me contacter
                                            </Link>
                                        </Flex>
                                        <Spacer />
                                        <Flex
                                            direction={'column'}
                                            alignItems={'Center'}
                                        >
                                            <Link href='tel:0635198016'>
                                                <FaSquarePhone
                                                    fontSize='xx-large'
                                                    color='white'
                                                />
                                            </Link>
                                            <Link
                                                pt={1}
                                                color='white'
                                                href='tel:0635198016'
                                            >
                                                06 35 19 80 16
                                            </Link>
                                        </Flex>
                                        <Spacer />
                                    </Flex>
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                </Providers>
            </body>
        </html>
    );
}
