import { Box, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import LinkItem from 'showed/components/footer/entities/link';
import React from 'react';

export default function SocialNetworkLinks({
    linkItems,
}: {
    linkItems: LinkItem[];
}) {
    return (
        <>
            {React.Children.toArray(
                linkItems.map((linkItem) => (
                    <>
                        <Flex direction={'column'} alignItems={'Center'}>
                            <Link as={NextLink} href={linkItem.target}>
                                {linkItem.icone}
                            </Link>
                            <Link
                                as={NextLink}
                                pt={1}
                                href={linkItem.target}
                                textAlign='center'
                            >
                                {linkItem.label}
                            </Link>
                        </Flex>
                        <Spacer />
                    </>
                ))
            )}
        </>
    );
}
