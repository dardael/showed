import 'showed/lib/core/dependencyInjection/container';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import MenuBar from 'showed/components/menu/menuBar';
import FooterBar from 'showed/components/footer/footerBar';
import { Box, Flex } from '@chakra-ui/react';
import { getPages } from 'showed/controllers/page/pageController';
import { getSocialNetworks } from 'showed/controllers/socialNetwork/socialNetworkController';
import { getTheme } from 'showed/controllers/theme/themeController';

export async function generateMetadata(): Promise<Metadata> {
    const theme = await getTheme();
    return {
        title: theme.title,
        description: theme.description,
        icons: { icon: './favicon.ico' },
    };
}
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pages = await getPages();
    const socialNetworks = await getSocialNetworks();
    const theme = await getTheme();
    return (
        <html lang='fr'>
            <body>
                <Providers initialTheme={theme}>
                    <Flex height={'100vh'} direction='column'>
                        <Box flex='0 0 fit-content' maxH={'fit-content'}>
                            <MenuBar pages={pages} />
                        </Box>
                        <Flex
                            direction='column'
                            flex='1'
                            overflowX={'hidden'}
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
                            <FooterBar socialNetworks={socialNetworks} />
                        </Flex>
                    </Flex>
                </Providers>
            </body>
        </html>
    );
}
