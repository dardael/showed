import {
    Box,
    FormControl,
    SimpleGrid,
    FormLabel,
    Input,
    Select,
    Textarea,
    Button,
} from '@chakra-ui/react';
import Banner from 'showed/components/banner/banner';
export default function Home() {
    return (
        <>
            <Banner text='Avec vos disponibilités et vos objectifs, nous pourrons définir ensemble la meilleur facon de vous accompagner' />
            <form>
                <SimpleGrid
                    columns={{ sm: 1, md: 2 }}
                    spacing='40px'
                    padding={'40px'}
                >
                    <FormControl isRequired>
                        <FormLabel>Nom</FormLabel>
                        <Input name='name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Prénom</FormLabel>
                        <Input name='surname' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input name='email' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Téléphone</FormLabel>
                        <Input name='phone' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Objectif principal</FormLabel>
                        <Select name='objective'>
                            <option></option>
                            <option>Bien être</option>
                            <option>Gain de performance</option>
                            <option>Perte de poids</option>
                            <option>Préparation à une course</option>
                            <option>Remise en forme</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Nombre de séance par semaine</FormLabel>
                        <Select name='sessionNumber'>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Message pour le coach</FormLabel>
                        <Textarea name='message' />
                    </FormControl>
                </SimpleGrid>
                <Box margin={'40px'} textAlign={'right'}>
                    <Button color='white' colorScheme='red' type='submit'>
                        Envoyer la demande
                    </Button>
                </Box>
            </form>
        </>
    );
}
