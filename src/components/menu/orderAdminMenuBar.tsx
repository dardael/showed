'use client';
import { Box, IconButton, useMediaQuery } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { logout } from 'showed/controllers/authentification/loginController';
import { ThemeContext } from 'showed/app/providers';
import MobileMenuBar from './mobileMenuBar';
import LaptopMenuBar from './laptopMenuBar';
import LinkItem from 'showed/components/menu/entities/link';
import { generateFingerprint } from 'showed/lib/frontend/core/authentification';

export default function OrderAdminMenuBar() {
    const { theme } = useContext(ThemeContext);
    const linkItems = [
        new LinkItem('Commandes', '/orders'),
        new LinkItem('Produits', '/products'),
    ];
    const [isMobile] = useMediaQuery('(max-width: 750px)');
    return (
        <>
            <Box color={'white'} backgroundColor={theme.color + '.500'}>
                {isMobile ? (
                    <MobileMenuBar links={linkItems} />
                ) : (
                    <LaptopMenuBar links={linkItems} />
                )}

                <IconButton
                    isRound
                    aria-label='Se déconnecter de cet appareil'
                    title='Se déconnecter de cet appareil'
                    icon={<BiLogOutCircle />}
                    onClick={async () => {
                        await logout(await generateFingerprint());
                        location.reload();
                    }}
                    position={'absolute'}
                    top={'30px'}
                    right={'20px'}
                    variant='ghost'
                    bgColor={'white'}
                />
            </Box>
        </>
    );
}
