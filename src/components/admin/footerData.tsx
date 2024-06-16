import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Heading,
} from '@chakra-ui/react';
import SocialNetworkData from 'showed/components/admin/footer/socialNetworkData';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import VerticalTabs from 'showed/components/core/tabs/verticalTabs';

export default function FooterData() {
    return (
        <Box padding={'40px'}>
            <VerticalTabs
                pages={[
                    { title: 'Instagram', content: <SocialNetworkData /> },
                    { title: 'Facebook', content: <SocialNetworkData /> },
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
