'use client';
import { Box, Flex, Spacer, Center } from '@chakra-ui/react';
import React, { useContext } from 'react';
import SocialNetworkLinks from './socialNetworkLinks';
import { ThemeContext } from 'showed/app/providers';
import { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import LinkItem from 'showed/components/footer/entities/link';

export default function FooterBar({
    socialNetworks,
}: {
    socialNetworks: SocialNetwork[];
}) {
    const { theme } = useContext(ThemeContext);
    const linkItems = socialNetworks.map((socialNetwork) =>
        LinkItem.fromSocialNetwork(socialNetwork)
    );
    return (
        <Box
            height={'100px'}
            color={'white'}
            backgroundColor={theme.color + '.500'}
        >
            <Center>
                <Flex alignItems={'Center'} height={'100px'} width={'full'}>
                    <Spacer />
                    <SocialNetworkLinks linkItems={linkItems} />
                </Flex>
            </Center>
        </Box>
    );
}
