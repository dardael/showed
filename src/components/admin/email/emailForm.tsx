import React from 'react';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import TextAreaInput from 'showed/components/core/form/inputs/textAreaInput';
import { Box } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const EmailForm = ({
    label,
    defaultSubject,
    defaultBody,
    onSend,
    emailKey,
}: {
    label: string;
    emailKey: string;
    defaultSubject?: string;
    defaultBody?: string;
    onSend: (formData: FormData) => Promise<void>;
}) => {
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    return (
        <Box display='flex' alignItems='flex-start'>
            <Box flex='1'>
                <SaveForm
                    action={onSend}
                    header={label}
                    parameters={[{ key: 'key', value: emailKey }]}
                >
                    <TextInput
                        label='Objet du mail'
                        name='subject'
                        placeholder='Objet du mail'
                        isRequired
                        defaultValue={defaultSubject || ''}
                    />

                    <TextAreaInput
                        label='Corps du mail'
                        name='body'
                        defaultValue={defaultBody || ''}
                        placeholder='Corps du mail'
                        rows={6}
                        isRequired
                    />
                </SaveForm>
            </Box>
            <Box
                display='flex'
                alignItems='flex-start'
                paddingTop={'15px'}
                paddingLeft={'5px'}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    cursor='pointer'
                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                    flexShrink={0}
                    title='Afficher/Masquer le résumé des variables'
                >
                    <Box marginRight='8px'>
                        {isSummaryOpen ? <FaChevronLeft /> : <FaChevronRight />}
                    </Box>
                </Box>
                {isSummaryOpen && (
                    <Box
                        marginLeft='16px'
                        padding='8px'
                        borderWidth='1px'
                        borderRadius='md'
                        flex='1'
                    >
                        <p>
                            Utilisez ces variables dans votre modèle de mail
                            pour les personnaliser en fonction du client et de
                            la commande.
                        </p>
                        <p>
                            <strong>{'{client.nom}'}</strong> : Nom du client
                        </p>
                        <p>
                            <strong>{'{client.prenom}'}</strong> : Prénom du
                            client
                        </p>
                        <p>
                            <strong>{'{client.email}'}</strong> : Email du
                            client
                        </p>
                        <p>
                            <strong>{'{client.telephone}'}</strong> : Téléphone
                            du client
                        </p>
                        <p>
                            <strong>{'{prix-total}'}</strong> : Prix total de la
                            commande
                        </p>
                        <p>
                            <strong>{'{recap-produits}'}</strong> :
                            Récapitulatif des produits de la commande
                        </p>
                        <p>
                            <strong>{'{ajd}'}</strong> : Date actuelle
                        </p>
                        <p>
                            <strong>{'{maintenant}'}</strong> : Heure actuelle
                        </p>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EmailForm;
