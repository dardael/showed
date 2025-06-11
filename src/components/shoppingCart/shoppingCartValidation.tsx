import { Box } from '@chakra-ui/react';
import { validateOrder } from 'showed/controllers/product/orderController';
import { Customer } from 'showed/lib/product/models/order';
import TextInput from '../core/form/inputs/textInput';
import SaveForm from '../core/form/saveForm';
import PhoneNumberInput from '../core/form/inputs/phoneNumberInput';
import EmailInput from '../core/form/inputs/emailInput';

export default function ShoppingCartValidation({
    onOrderValidated,
}: {
    onOrderValidated: () => void;
}) {
    async function onFormValidated(data: FormData) {
        const customer: Customer = {
            name: data.get('name') as string,
            surname: data.get('surname') as string,
            email: data.get('email') as string,
            phoneNumber: data.get('phoneNumber') as string,
        };
        await validateOrder(customer);
        onOrderValidated();
    }
    return (
        <Box padding={'40px'}>
            <SaveForm
                action={onFormValidated}
                validateButtonLabel='Valider la commande'
                notificationLabels={{
                    loading: 'Commande en cours de validation',
                    error: 'Erreur lors de la validation de la commande',
                }}
            >
                <TextInput
                    name='name'
                    label='Nom'
                    placeholder='Veuillez renseigner votre nom'
                    isRequired
                />
                <TextInput
                    name='surname'
                    label={'Prénom'}
                    placeholder={'Veuillez renseigner votre prénom'}
                    isRequired
                />

                <EmailInput
                    name='email'
                    label='Adresse mail'
                    placeholder='Veuillez renseigner votre adresse mail'
                    isRequired
                />
                <PhoneNumberInput
                    name='phoneNumber'
                    label='Numéro de téléphone'
                    placeholder='Veuillez renseigner votre numéro de téléphone'
                    isRequired
                />
            </SaveForm>
        </Box>
    );
}
