'use client';
import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    Heading,
    Image,
    List,
    ListIcon,
    ListItem,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

export default function Home() {
    return (
        <Box>
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
            <Center mt={10}>
                <Avatar
                    size='2xl'
                    name='Segun Adebayo'
                    src='https://bit.ly/sage-adebayo'
                />
            </Center>
            <Center mt={5}>
                <Text fontSize={'2xl'}>PERFORMANCE / SANTE / BIEN ÊTRE</Text>
            </Center>
            <Center mt={5}>
                <Text fontSize={'lg'} textAlign={'center'}>
                    Coach sportif sur Grenoble, je m&apos;appelle Aurélien
                    DIDIER. Je suis à votre disposition pour vous aider à
                    atteindre vos objectifs. Mon accompagnement se traduit par :
                </Text>
            </Center>
            <Center mt={5}>
                <List spacing={3}>
                    <ListItem fontSize={'md'}>
                        <ListIcon as={MdCheckCircle} color={'green.500'} />
                        Une définition des objectifs que vous souhaitez
                        atteindre
                    </ListItem>
                    <ListItem fontSize={'md'}>
                        <ListIcon as={MdCheckCircle} color={'green.500'} />
                        Un programme construit avec et pour vous
                    </ListItem>
                    <ListItem fontSize={'md'}>
                        <ListIcon as={MdCheckCircle} color={'green.500'} />
                        Un coaching au plus prêt pour chacune de vos séances
                    </ListItem>
                </List>
            </Center>
            <Flex mt={10}>
                <Spacer />
                <Box borderRadius='lg' h='400px' w='sm'>
                    <Card padding='0' h='inherit'>
                        <CardHeader>
                            <Image
                                borderRadius='lg'
                                src='/programme.jpg'
                            ></Image>
                        </CardHeader>
                        <CardBody>
                            <Center>
                                <Text fontSize='2xl' textAlign={'center'}>
                                    Programme mensuel
                                </Text>
                            </Center>
                        </CardBody>
                    </Card>
                </Box>
                <Spacer />
                <Box borderRadius='lg' h='400px' w='sm'>
                    <Card padding='0' h='inherit'>
                        <CardHeader>
                            <Image
                                borderRadius='lg'
                                src='/coaching.jpg'
                            ></Image>
                        </CardHeader>
                        <CardBody>
                            <Center>
                                <Text fontSize='2xl' textAlign={'center'}>
                                    Coaching individuel
                                </Text>
                            </Center>
                        </CardBody>
                    </Card>
                </Box>
                <Spacer />
            </Flex>
        </Box>
    );
}
