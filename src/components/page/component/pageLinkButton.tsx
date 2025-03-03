'use client';
import { Button as ChakraButton, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getPages } from 'showed/controllers/page/pageController';
import { Page } from 'showed/lib/page/models/page';
import Link from 'next/link';

export default function PageLinkButton({
    text,
    link,
}: {
    text: string;
    link: string;
}) {
    const [page, setPage] = useState<Page | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getPages().then((foundPages: Page[]) => {
            setPage(foundPages.find((page) => page._id === link) as Page);
            setIsLoading(false);
        });
    }, [link]);

    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Link href={'/page/' + page?.urlPart + '?id=' + page?.urlPart}>
                    <ChakraButton
                        height={'29px'}
                        borderStyle={'solid'}
                        borderWidth={'2px'}
                        borderColor={'white'}
                    >
                        {text}
                    </ChakraButton>
                </Link>
            )}
        </>
    );
}
