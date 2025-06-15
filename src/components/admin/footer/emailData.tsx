'use client';
import { useEffect, useState } from 'react';
import Loading from 'showed/components/core/feedback/loading';
import EmailInput from 'showed/components/core/form/inputs/emailInput';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import {
    getSocialNetwork,
    saveSocialNetwork,
} from 'showed/controllers/socialNetwork/socialNetworkController';
import type { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default function EmailData() {
    const [socialNetwork, setSocialNetwork] = useState<
        SocialNetwork | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getSocialNetwork(SocialNetworkName.Email).then((foundSocialNetwork) => {
            setSocialNetwork(foundSocialNetwork);
            setIsLoading(false);
        });
    }, []);
    const formParameters = [
        { key: 'id', value: socialNetwork?._id },
        { key: 'name', value: SocialNetworkName.Email },
    ];
    return (
        <Loading isLoading={isLoading}>
            <SaveForm
                action={async (data: FormData) => {
                    return saveSocialNetwork(data).then(
                        (updatedSocialNetwork) =>
                            setSocialNetwork(updatedSocialNetwork)
                    );
                }}
                parameters={formParameters}
            >
                <TextInput
                    label='Texte affiché'
                    name='text'
                    placeholder='Texte affiché'
                    defaultValue={socialNetwork?.text}
                />
                <EmailInput
                    label='Email'
                    name='link'
                    placeholder='Entrez votre email'
                    defaultValue={socialNetwork?.link}
                />
            </SaveForm>
        </Loading>
    );
}
