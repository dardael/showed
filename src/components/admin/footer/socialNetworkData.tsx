'use client';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import {
    getSocialNetwork,
    saveSocialNetwork,
} from 'showed/controllers/socialNetwork/socialNetworkController';
import { SocialNetworkClass } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default function SocialNetworkData({
    name,
}: {
    name: SocialNetworkName;
}) {
    const [socialNetwork, setSocialNetwork] = useState<
        SocialNetworkClass | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getSocialNetwork(name).then((foundSocialNetwork) => {
            setSocialNetwork(foundSocialNetwork);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <SaveForm
                    action={(data: FormData) => {
                        saveSocialNetwork(data).then((socialNetwork) =>
                            setSocialNetwork(socialNetwork)
                        );
                    }}
                    parameters={[
                        { key: 'id', value: socialNetwork?.id },
                        { key: 'name', value: name },
                    ]}
                >
                    <TextInput
                        label='Texte affiché'
                        name='text'
                        placeholder='Texte affiché'
                        defaultValue={socialNetwork?.text}
                    />
                    <TextInput
                        label='Lien'
                        name='link'
                        placeholder='Lien'
                        defaultValue={socialNetwork?.link}
                    />
                </SaveForm>
            )}
        </>
    );
}
