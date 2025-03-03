'use client';
import { Icon as ChakraIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { GiHearts, GiLinkedRings, GiLovers } from 'react-icons/gi';
import { BsHouseHeartFill } from 'react-icons/bs';
import { ThemeContext } from 'showed/app/providers';

export default function Icon({ icon }: { icon: string }) {
    const { theme } = useContext(ThemeContext);
    let iconComponent;
    switch (icon) {
        case 'GiLinkedRings':
            iconComponent = GiLinkedRings;
            break;
        case 'GiHearts':
            iconComponent = GiHearts;
            break;
        case 'GiLovers':
            iconComponent = GiLovers;
            break;
        case 'BsHouseHeartFill':
            iconComponent = BsHouseHeartFill;
            break;
        default:
            iconComponent = GiLinkedRings;
            break;
    }
    return (
        <ChakraIcon
            color={theme.color + '.400'}
            as={iconComponent}
            boxSize='50px'
        />
    );
}
