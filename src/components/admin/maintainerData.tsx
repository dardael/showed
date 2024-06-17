import { Box } from '@chakra-ui/react';
import { use } from 'react';
import Provider from 'showed/lib/maintainer/service/provider';
import { MaintainerClass } from 'showed/lib/maintainer/models/maintainer';
import { container } from 'tsyringe';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';

async function saveMaintainer(data: FormData) {
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
    const maintainer: MaintainerClass | undefined = use(getMaintainer());
    return (
        <Box padding={'40px'}>
            <SaveForm
                action={saveMaintainer}
                parameters={[{ key: 'id', value: maintainer?.id }]}
            >
                <TextInput
                    label='Adresse mail'
                    name='email'
                    placeholder='email'
                    defaultValue={maintainer?.email}
                    isRequired
                />
                <TextInput
                    label='Nom'
                    name='name'
                    placeholder='name'
                    defaultValue={maintainer?.name}
                />
                <TextInput
                    label='Prénom'
                    name='surname'
                    placeholder='surname'
                    defaultValue={maintainer?.surname}
                />
            </SaveForm>
        </Box>
    );
}
