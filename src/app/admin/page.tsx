import { Box, Button, Input } from '@chakra-ui/react';
import { use } from 'react';
import Repository from 'showed/lib/maintainer/bridge/database/repository';
import Provider from 'showed/lib/maintainer/provider';
import { MaintainerClass } from 'showed/models/maintainer';

async function action(data: FormData) {
    'use server';
    const id = data.get('id')?.toString();
    const email = data.get('email')?.toString();
    const name = data.get('name')?.toString();
    const surname = data.get('surname')?.toString();
    if (!email) {
        return;
    }
    const repository = new Repository();
    const provider = new Provider(repository);
    if (id) {
        provider.updateMaintainer(id, { email, name, surname });
    } else {
        provider.createMaintainer(email);
    }
}

async function getMaintainer(): Promise<MaintainerClass | undefined> {
    'use server';
    const repository = new Repository();
    const provider = new Provider(repository);
    const maintainer = await provider.getMaintainer();
    return maintainer;
}
export default function Home() {
    'use client';
    const maintainer = use(getMaintainer());

    return (
        <Box>
            <form action={action}>
                <Input type='hidden' name='id' value={maintainer?.id} />
                <Input
                    placeholder='email'
                    name='email'
                    defaultValue={maintainer?.email}
                />
                <Input
                    placeholder='name'
                    name='name'
                    defaultValue={maintainer?.name}
                />
                <Input
                    placeholder='surname'
                    name='surname'
                    defaultValue={maintainer?.surname}
                />
                <Button type='submit'>Enregistrer</Button>
            </form>
        </Box>
    );
}
