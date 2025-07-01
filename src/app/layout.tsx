import 'showed/lib/core/dependencyInjection/container';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
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
    const theme = await getTheme();
    return (
        <html lang='fr'>
            <body>
                <Providers initialTheme={theme}>{children} </Providers>
            </body>
        </html>
    );
}
