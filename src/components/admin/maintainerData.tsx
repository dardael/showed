'use client';
import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import {
    getMaintainer,
    saveMaintainer,
} from 'showed/controllers/maintainer/maintainerController';

export default function MaintainerData() {
    const [maintainer, setMaintainer] = useState<Maintainer | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getMaintainer().then((foundMaintainer: Maintainer | undefined) => {
            setMaintainer(foundMaintainer);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    <SaveForm
                        action={async (formData: FormData) => {
                            return saveMaintainer(formData).then(
                                (updatedMaintainer) => {
                                    setMaintainer(updatedMaintainer);
                                }
                            );
                        }}
                        parameters={[{ key: 'id', value: maintainer?._id }]}
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
            )}
        </>
    );
}
