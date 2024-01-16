import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Box, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';

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
                                    'border-radius': '16px',
                                    'box-shadow':
                                        'inset 2px 2px 2px hsla(0,0%,100%,.25),inset -2px -2px 2px rgba(0,0,0,.25)',
                                },
                            }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Providers>
            </body>
        </html>
    );
}
