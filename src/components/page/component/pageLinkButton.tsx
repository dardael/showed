'use client';
import { Button as ChakraButton, Spinner } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPages } from 'showed/controllers/page/pageController';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import { Page } from 'showed/lib/page/models/page';
import Link from 'next/link';

export default function PageLinkButton({
    component,
}: {
    component: ComponentModel;
}) {
    const [page, setPage] = useState<Page | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getPages().then((foundPages: Page[]) => {
            setPage(
                foundPages.find((page) => page._id === component.link) as Page
            );
            setIsLoading(false);
        });
    }, []);

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
                        {component.content}
                    </ChakraButton>
                </Link>
            )}
        </>
    );
}
