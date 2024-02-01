import { Box, Button, Input } from '@chakra-ui/react';
import { use } from 'react';
import { getMaintainers } from 'showed/lib/maintainer/bridge/database/repository';

import {
    createMaintainerAction,
    updateMaintainerAction,
} from 'showed/lib/maintainer/service/provider';

async function action(data: FormData) {
    'use server';
    const id = data.get('id')?.toString();
    const email = data.get('email')?.toString();
    const name = data.get('name')?.toString();
    const surname = data.get('surname')?.toString();
    if (!email) {
        return;
    }
    if (id) {
        await updateMaintainerAction(id, { email, name, surname }, '/admin');
    } else {
        await createMaintainerAction({ email, path: '/admin' });
    }
}

async function getMaintainer() {
    const response = await getMaintainers({ limit: 1 });
    return response.maintainers?.pop();
}
export default function Home() {
    const maintainer = use(getMaintainer());

    return (
        <Box>
            <form action={action}>
                <Input type='hidden' name='id' value={maintainer?.id} />
                <Input
                    placeholder='email'
                    name='email'
                    value={maintainer?.email}
                />
                <Input
                    placeholder='name'
                    name='name'
                    value={maintainer?.name}
                />
                <Input
                    placeholder='surname'
                    name='surname'
                    value={maintainer?.surname}
                />
                <Button type='submit'>Enregistrer</Button>
            </form>
        </Box>
    );
}
