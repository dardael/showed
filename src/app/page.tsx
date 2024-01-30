'use client';
import { Box, Center, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import Banner from 'showed/components/banner/banner';

export default function Home() {
    return (
        <Box marginBottom={'40px'}>
            <Banner
                texts={[
                    'Tiffany Clemenson',
                    'kinésithérapeute à domicile dans le Royans',
                ]}
            />
            <Center mt={10}>
                <Text fontSize={'2xl'}>SOIN / REEDUCATION</Text>
            </Center>
            <Center mt={5} padding={'40px'}>
                <Text fontSize={'lg'} textAlign={'center'}>
                    Kinésithérapeute dans le Royans, je m&apos;appelle Tiffany
                    CLEMENSON. Je me suis spécialisée dans les soins à domicile.
                    Je ne peux intervenir que si vous avez une ordonnance
                    spécifiant une prise en charge à domicile. Si tel est le
                    cas, je vous contacterai quand une place se libérera. Ma
                    prise en charge se traduit par :
                </Text>
            </Center>
            <Center mt={5}>
                <List spacing={3}>
                    <ListItem fontSize={'md'}>
                        <ListIcon
                            as={MdCheckCircle}
                            color={'black'}
                            fontSize={'xl'}
                        />
                        Une premiére séance pour établir un bilan. Celui ci me
                        permettra de déterminer les soins à vous apporter.
                    </ListItem>
                    <ListItem fontSize={'md'}>
                        <ListIcon
                            as={MdCheckCircle}
                            color={'black'}
                            fontSize={'xl'}
                        />
                        Plusieurs séances pour vous ammener au meilleur
                        rétablissement possible
                    </ListItem>
                    <ListItem fontSize={'md'}>
                        <ListIcon
                            as={MdCheckCircle}
                            color={'black'}
                            fontSize={'xl'}
                        />
                        Une présentation d&apos;exercices que vous faire seul
                        chez vous pour améliorer les résultats
                    </ListItem>
                </List>
            </Center>
        </Box>
    );
}
