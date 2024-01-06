import NextLink from 'next/link';
import { Flex, Spacer, Link, Center } from '@chakra-ui/react';

export default function Home() {
    return (
        <Center bg='tomato' h='100px' color='white'>
            <Flex alignItems='center' width='full'>
                <Spacer />
                <Link as={NextLink} href='/'>
                    Accueil
                </Link>
                <Spacer />
                <Link as={NextLink} href='/company'>
                    L&apos;entreprise
                </Link>
                <Spacer />
                <Link as={NextLink} href='/location'>
                    Nous trouver
                </Link>
                <Spacer />
                <Link as={NextLink} href='/openingTime'>
                    Horaires d&apos;ouverture
                </Link>
                <Spacer />
                <Link as={NextLink} href='/contact'>
                    Contacts
                </Link>
                <Spacer />
            </Flex>
        </Center>
    );
}
