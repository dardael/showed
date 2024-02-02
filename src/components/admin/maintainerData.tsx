import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { use } from 'react';
import Provider from 'showed/lib/maintainer/service/provider';
import { MaintainerClass } from 'showed/lib/maintainer/models/maintainer';
import { container } from 'tsyringe';

async function action(data: FormData) {
    'use server';
    const id = data.get('id')?.toString();
    const email = data.get('email')?.toString();
    const name = data.get('name')?.toString();
    const surname = data.get('surname')?.toString();
    if (!email) {
        return;
    }
    const provider: Provider = container.resolve('MaintainerProvider');
    if (id) {
        provider.updateMaintainer(id, { email, name, surname });
    } else {
        provider.createMaintainer(email);
    }
}

async function getMaintainer(): Promise<MaintainerClass | undefined> {
    'use server';
    const provider: Provider = container.resolve('MaintainerProvider');
    const maintainer = await provider.getMaintainer();
    return maintainer;
}
export default function MaintainerData() {
    const maintainer = use(getMaintainer());
    return (
        <Box padding={'40px'}>
            <form action={action}>
                <Input type='hidden' name='id' value={maintainer?.id} />
                <FormControl isRequired>
                    <FormLabel>Adresse mail</FormLabel>
                    <Input
                        placeholder='email'
                        name='email'
                        defaultValue={maintainer?.email}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Nom</FormLabel>

                    <Input
                        placeholder='name'
                        name='name'
                        defaultValue={maintainer?.name}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Prénom</FormLabel>
                    <Input
                        placeholder='surname'
                        name='surname'
                        defaultValue={maintainer?.surname}
                    />
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
