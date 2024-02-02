import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function FooterData() {
    return (
        <Box padding={'40px'}>
            <form>
                <Input type='hidden' name='id' />
                <FormControl isRequired>
                    <FormLabel>Adresse mail</FormLabel>
                    <Input placeholder='email' name='email' />
                </FormControl>
                <FormControl>
                    <FormLabel>Nom</FormLabel>

                    <Input placeholder='name' name='name' />
                </FormControl>
                <FormControl>
                    <FormLabel>Prénom</FormLabel>
                    <Input placeholder='surname' name='surname' />
                </FormControl>
                <Box textAlign={'right'} paddingTop={'20px'}>
                    <Button color='white' colorScheme='red' type='submit'>
                        Enregistrer
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
