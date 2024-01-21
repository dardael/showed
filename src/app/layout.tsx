import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import MenuBar from 'showed/components/menu/menuBar';
import FooterBar from 'showed/components/footer/footerBar';
import { Box } from '@chakra-ui/react';

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
                            <FooterBar />
                        </Box>
                    </Box>
                </Providers>
            </body>
        </html>
    );
}
