import { Box, Heading, Center } from '@chakra-ui/react';
export default function Banner({ texts }: { texts: string[] }) {
    return (
        <Box
            height={450}
            backgroundSize={'cover'}
            backgroundImage={'/banner.jpg'}
        >
            <Center h={'inherit'}>
                <Heading as='h1' color={'white'} textAlign={'center'}>
                    {texts.map((text) => (
                        <p key={text}>{text}</p>
                    ))}
                </Heading>
            </Center>{' '}
        </Box>
    );
}
