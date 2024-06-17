import { Box } from '@chakra-ui/react';
import SocialNetworkData from 'showed/components/admin/footer/socialNetworkData';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import VerticalTabs from 'showed/components/core/tabs/verticalTabs';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default function FooterData() {
    return (
        <Box padding={'40px'}>
            <VerticalTabs
                pages={[
                    {
                        title: 'Instagram',
                        content: (
                            <SocialNetworkData
                                key={SocialNetworkName.Instagram.toString()}
                                name={SocialNetworkName.Instagram}
                            />
                        ),
                    },
                    {
                        title: 'Facebook',
                        content: (
                            <SocialNetworkData
                                key={SocialNetworkName.Facebook.toString()}
                                name={SocialNetworkName.Facebook}
                            />
                        ),
                    },
                    {
                        title: 'Téléphone',
                        content: (
                            <SaveForm>
                                <TextInput
                                    label='Numéro de téléphone'
                                    name='phoneNumber'
                                    placeholder='Numéro de téléphone'
                                />
                            </SaveForm>
                        ),
                    },
                    {
                        title: 'Lien vers la page de contact',
                        content: (
                            <SaveForm>
                                <TextInput
                                    label='Texte affiché'
                                    name='text'
                                    placeholder='Texte affiché'
                                />
                            </SaveForm>
                        ),
                    },
                ]}
            />
        </Box>
    );
}
