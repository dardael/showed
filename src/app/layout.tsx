import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
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
                        <Center
                            fontWeight='600'
                            fontFamily={'system-ui'}
                            bg='black'
                            h='100px'
                            color='white'
                        >
                            <Flex alignItems='center' width='full'>
                                <Spacer />
                                <Link as={NextLink} href='/'>
                                    Accueil
                                </Link>
                                <Spacer />
                                <Link as={NextLink} href='/coaching'>
                                    Coaching individuel
                                </Link>
                                <Spacer />
                                <Link as={NextLink} href='/programme'>
                                    Programme mensuel
                                </Link>
                                <Spacer />
                                <Link as={NextLink} href='/presentation'>
                                    Qui suis-je ?
                                </Link>
                                <Spacer />
                                <Link as={NextLink} href='/contact'>
                                    Me contacter
                                </Link>
                                <Spacer />
                            </Flex>
                        </Center>
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
                                        <RiInstagramFill
                                            fontSize='xx-large'
                                            color='white'
                                        />
                                        <Spacer />
                                        <FaSquareFacebook
                                            fontSize='xx-large'
                                            color='white'
                                        />
                                        <Spacer />
                                        <IoMdMail
                                            fontSize='xx-large'
                                            color='white'
                                        />
                                        <Spacer />
                                        <FaSquarePhone
                                            fontSize='xx-large'
                                            color='white'
                                        />
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
