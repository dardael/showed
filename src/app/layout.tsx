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
                    <Center bg='tomato' h='100px' color='white'>
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
                    <Box>{children}</Box>
                </Providers>
            </body>
        </html>
    );
}
