import { Flex, Spacer, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function MenuBar() {
    return (
        <Center
            fontWeight='600'
            fontFamily={'system-ui'}
            bg='black'
            h='100px'
            color='white'
        >
            <Flex alignItems='center' width='full'>
                <Spacer />
                <Link as={NextLink} href='/'>
                    Accueil
                </Link>
                <Spacer />
                <Link as={NextLink} href='/coaching'>
                    Coaching individuel
                </Link>
                <Spacer />
                <Link as={NextLink} href='/programme'>
                    Programme mensuel
                </Link>
                <Spacer />
                <Link as={NextLink} href='/presentation'>
                    Qui suis-je ?
                </Link>
                <Spacer />
                <Link as={NextLink} href='/contact'>
                    Me contacter
                </Link>
                <Spacer />
            </Flex>
        </Center>
    );
}
