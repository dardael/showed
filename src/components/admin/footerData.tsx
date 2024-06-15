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
import SaveForm from '../core/form/saveForm';
import TextInput from '../core/form/inputs/textInput';

export default function FooterData() {
    return (
        <Box padding={'40px'}>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading as='h5' size='sm'>
                                Instagram
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <SocialNetworkData />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading as='h5' size='sm'>
                                Facebook
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <SocialNetworkData />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading as='h5' size='sm'>
                                Téléphone
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <SaveForm>
                            <TextInput
                                label='Numéro de téléphone'
                                name='phoneNumber'
                                placeholder='Numéro de téléphone'
                            />
                        </SaveForm>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading as='h5' size='sm'>
                                Lien vers la page de contact
                            </Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <SaveForm>
                            <TextInput
                                label='Texte affiché'
                                name='text'
                                placeholder='Texte affiché'
                            />
                        </SaveForm>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
}
