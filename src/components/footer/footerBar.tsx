'use server';
import { Box, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import LinkItem from 'showed/components/footer/entities/link';
import React from 'react';
import { getSocialNetworks } from 'showed/controllers/socialNetwork/socialNetworkController';
export default async function FooterBar() {
    const socialNetworks = await getSocialNetworks();
    const linkItems = socialNetworks.map((socialNetwork) =>
        LinkItem.fromSocialNetwork(socialNetwork)
    );
    return (
        <Box backgroundColor={'black'} height={'100px'}>
            <Center>
                <Flex alignItems={'Center'} height={'100px'} width={'full'}>
                    <Spacer />
                    {React.Children.toArray(
                        linkItems.map((linkItem) => (
                            <>
                                <Flex
                                    direction={'column'}
                                    alignItems={'Center'}
                                >
                                    <Link as={NextLink} href={linkItem.target}>
                                        {linkItem.icone}
                                    </Link>
                                    <Link
                                        as={NextLink}
                                        pt={1}
                                        color='white'
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
                </Flex>
            </Center>
        </Box>
    );
}
