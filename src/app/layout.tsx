import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Box, Image, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';

const inter = Inter({ subsets: ['latin'] });

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
                    <Center bg='tomato' h='100px' color='white'>
                        <Flex alignItems='center' width='full'>
                            <Spacer />
                            <Link as={NextLink} href='/'>
                                Accueil
                            </Link>
                            <Spacer />
                            <Link as={NextLink} href='/company'>
                                L&apos;entreprise
                            </Link>
                            <Spacer />
                            <Link as={NextLink} href='/location'>
                                Nous trouver
                            </Link>
                            <Spacer />
                            <Link as={NextLink} href='/openingTime'>
                                Horaires d&apos;ouverture
                            </Link>
                            <Spacer />
                            <Link as={NextLink} href='/contact'>
                                Contacts
                            </Link>
                            <Spacer />
                        </Flex>
                    </Center>
                    <Box>{children}</Box>
                </Providers>
            </body>
        </html>
    );
}
