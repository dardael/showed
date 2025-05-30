import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import ShoppingCartSummary from './shoppingCartSummary';
import { Product } from 'showed/lib/product/models/product';
import { ThemeContext } from 'showed/app/providers';

export default function ShoppingCartValidated({
    shoppingCart,
}: {
    shoppingCart: { product: Product; quantity: number }[];
}) {
    const { theme } = useContext(ThemeContext);

    return (
        <Box padding='40px' bg='gray.50' borderRadius='md' boxShadow='lg'>
            <VStack spacing={6} align='stretch'>
                <Heading
                    as='h1'
                    size='lg'
                    textAlign='center'
                    color={theme.color + '.500'}
                >
                    {'Merci pour votre commande !'}
                </Heading>
                <Text fontSize='md' textAlign='center' color='gray.700'>
                    {'Votre commande a été validée avec succès.'}
                </Text>
                <Text fontSize='md' textAlign='center' color='gray.700'>
                    {'Voici les détails de votre commande :'}
                </Text>
                <ShoppingCartSummary products={shoppingCart} />
                <Center>
                    <Button
                        marginTop='20px'
                        colorScheme={theme.color}
                        size='lg'
                        onClick={() => (window.location.href = '/')}
                    >
                        {"Retour à la page d'accueil"}
                    </Button>
                </Center>
            </VStack>
        </Box>
    );
}
