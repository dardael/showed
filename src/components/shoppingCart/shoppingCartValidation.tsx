import { Box, Button, Center, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { validateOrder } from 'showed/controllers/product/orderController';
import { Customer } from 'showed/lib/product/models/order';

export default function ShoppingCartValidation({
    onOrderValidated,
}: {
    onOrderValidated: () => void;
}) {
    const [customer, setCustomer] = useState<Customer>({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
    });
    return (
        <Box padding={'40px'}>
            <Text marginBottom={'10px'}>Nom</Text>
            <Input
                placeholder='Veuillez renseigner votre nom'
                onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                }
            />
            <Text marginTop={'15px'} marginBottom={'10px'}>
                {'Prénom'}
            </Text>
            <Input
                placeholder={'Veuillez renseigner votre prénom'}
                onChange={(e) =>
                    setCustomer({ ...customer, surname: e.target.value })
                }
            />

            <Text marginTop={'15px'} marginBottom={'10px'}>
                {'Adresse mail'}
            </Text>
            <Input
                type='email'
                placeholder='Veuillez renseigner votre adresse mail'
                onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                }
            />
            <Text marginTop={'15px'} marginBottom={'10px'}>
                {'Numéro de téléphone'}
            </Text>
            <Input
                type='tel'
                placeholder='Veuillez renseigner votre numéro de téléphone'
                onChange={(e) =>
                    setCustomer({ ...customer, phoneNumber: e.target.value })
                }
            />
            <Center>
                <Button
                    marginTop={'20px'}
                    onClick={async () => {
                        await validateOrder(customer);
                        onOrderValidated();
                    }}
                >
                    Valider la commande
                </Button>
            </Center>
        </Box>
    );
}
