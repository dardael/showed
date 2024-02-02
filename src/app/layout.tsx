import 'showed/lib/core/dependencyInjection/container';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import MenuBar from 'showed/components/menu/menuBar';
import FooterBar from 'showed/components/footer/footerBar';
import { Box, Flex } from '@chakra-ui/react';

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
                    <Flex height={'100vh'} direction='column'>
                        <Box flex='0 0 fit-content' maxH={'fit-content'}>
                            <MenuBar />
                        </Box>
                        <Flex
                            direction='column'
                            flex='1'
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
                            <Box flex='1'>{children}</Box>
                            <FooterBar />
                        </Flex>
                    </Flex>
                </Providers>
            </body>
        </html>
    );
}
