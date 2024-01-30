import { Box, Heading, Center } from '@chakra-ui/react';
export default function Banner({ text }: { text: string }) {
    return (
        <Box
            height={450}
            backgroundSize={'cover'}
            backgroundImage={'/powder.jpg'}
        >
            <Center h={'inherit'}>
                <Heading as='h1' color={'white'} textAlign={'center'}>
                    {text}
                </Heading>
            </Center>
        </Box>
    );
}
