'use client';
import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import {
    getSocialNetwork,
    saveSocialNetwork,
} from 'showed/controllers/socialNetwork/socialNetworkController';
import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default function SocialNetworkData({
    name,
    unchangableLink,
    unchangableText,
    linkLabel,
}: {
    name: SocialNetworkName;
    unchangableLink?: string;
    unchangableText?: string;
    linkLabel?: string;
}) {
    const [socialNetwork, setSocialNetwork] = useState<
        SocialNetwork | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getSocialNetwork(name).then((foundSocialNetwork) => {
            setSocialNetwork(foundSocialNetwork);
            setIsLoading(false);
        });
    }, []);
    let formParameters = [
        { key: 'id', value: socialNetwork?._id },
        { key: 'name', value: name },
    ];
    if (unchangableLink) {
        formParameters.push({ key: 'link', value: unchangableLink });
    }
    if (unchangableText) {
        formParameters.push({ key: 'text', value: unchangableText });
    }
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <SaveForm
                    action={async (data: FormData) => {
                        return saveSocialNetwork(data).then(
                            (updatedSocialNetwork) =>
                                setSocialNetwork(updatedSocialNetwork)
                        );
                    }}
                    parameters={formParameters}
                >
                    {unchangableText ? (
                        <></>
                    ) : (
                        <TextInput
                            label='Texte affiché'
                            name='text'
                            placeholder='Texte affiché'
                            defaultValue={socialNetwork?.text}
                        />
                    )}
                    {unchangableLink ? (
                        <></>
                    ) : (
                        <TextInput
                            label={linkLabel ? linkLabel : 'Lien'}
                            name='link'
                            placeholder='Lien'
                            defaultValue={socialNetwork?.link}
                        />
                    )}
                </SaveForm>
            )}
        </>
    );
}
