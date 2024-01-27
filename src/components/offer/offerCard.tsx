import {
    Box,
    Spacer,
    Card,
    Image,
    Center,
    CardFooter,
    CardBody,
    CardHeader,
    Text,
    Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Offer from 'showed/lib/offer/entities/offer';

export default function OfferCard({ offer }: { offer: Offer }) {
    const routeur = useRouter();
    return (
        <Box borderRadius='lg' h='450px' w='sm'>
            <Card padding='0' h='inherit'>
                <CardHeader>
                    <Image borderRadius='lg' src={offer.imagePath}></Image>
                </CardHeader>
                <CardBody>
                    <Center>
                        <Text fontSize='2xl' textAlign={'center'}>
                            {offer.label}
                        </Text>
                    </Center>
                </CardBody>
                <CardFooter>
                    <Spacer />
                    <Button
                        onClick={() => routeur.push(offer.target)}
                        colorScheme='red'
                    >
                        {offer.label}
                    </Button>
                    <Spacer />
                </CardFooter>
            </Card>
        </Box>
    );
}
