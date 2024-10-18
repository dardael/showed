'use client';

import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { ThemeContext } from 'showed/app/providers';

export default function DecorativeBar({
    isWithTopBar,
    isWithBottomBar,
}: {
    isWithTopBar: boolean;
    isWithBottomBar: boolean;
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Flex direction={'column'} height={'100%'}>
            <Center height={'15px'}>
                <Box
                    height={'100%'}
                    borderWidth={'2px'}
                    borderColor={
                        isWithTopBar ? theme.color + '.500' : 'transparent'
                    }
                    width={'1px'}
                    borderStyle={'solid'}
                />
            </Center>
            <Center
                height={'50px'}
                width={'50px'}
                borderWidth={'3px'}
                borderColor={theme.color + '.500'}
                borderStyle={'solid'}
                borderRadius={'50px'}
            >
                <Icon
                    as={FaHeart}
                    color={theme.color + '.500'}
                    height={'15px'}
                    width={'15px'}
                />
            </Center>
            <Center height={'calc(100% - 65px)'}>
                <Box
                    height={'100%'}
                    borderWidth={'2px'}
                    borderColor={
                        isWithBottomBar ? theme.color + '.500' : 'transparent'
                    }
                    width={'1px'}
                    borderStyle={'solid'}
                />
            </Center>
        </Flex>
    );
}
