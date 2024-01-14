import { Box, Center, Heading } from '@chakra-ui/react';

export default function Home() {
    return (
        <Box
            height={450}
            backgroundSize={'cover'}
            backgroundImage={'/bandeau-sport.jpg'}
        >
            <Center h={'inherit'}>
                <Heading as='h1' color={'white'} textAlign={'center'}>
                    Atteignez vos objectifs avec Aurelien, Coach Sportif à
                    Grenoble
                </Heading>
            </Center>
        </Box>
    );
}
