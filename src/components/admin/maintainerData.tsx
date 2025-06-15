'use client';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { Maintainer } from 'showed/lib/maintainer/models/maintainer';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import {
    getMaintainer,
    saveMaintainer,
} from 'showed/controllers/maintainer/maintainerController';
import Loading from '../core/feedback/loading';
import EmailInput from '../core/form/inputs/emailInput';

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
        <Loading isLoading={isLoading}>
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
                    <EmailInput
                        label='Adresse mail'
                        name='email'
                        placeholder='Entrez votre adresse mail'
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
        </Loading>
    );
}
