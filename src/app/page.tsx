import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    Heading,
    Image,
    Spacer,
} from '@chakra-ui/react';

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
            <Flex>
                <Spacer />
                <Box borderRadius='lg' w='sm' h='m'>
                    <Card padding='0'>
                        <CardHeader>
                            <Image
                                borderRadius='lg'
                                src='/programme.jpg'
                            ></Image>
                        </CardHeader>
                        <CardBody>
                            <Center>
                                <Heading as='h4' textAlign={'center'}>
                                    Programme mensuel
                                </Heading>
                            </Center>
                        </CardBody>
                    </Card>
                </Box>
                <Spacer />
                <Box borderRadius='lg' h='m' w='sm'>
                    <Card padding='0'>
                        <CardHeader>
                            <Image
                                borderRadius='lg'
                                src='/coaching.jpg'
                            ></Image>
                        </CardHeader>
                        <CardBody>
                            <Center>
                                <Heading as='h4' textAlign={'center'}>
                                    Coaching individuel
                                </Heading>
                            </Center>
                        </CardBody>
                    </Card>
                </Box>
                <Spacer />
            </Flex>
        </Box>
    );
}
