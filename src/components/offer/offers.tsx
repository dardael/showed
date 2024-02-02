'use client';
import { Flex } from '@chakra-ui/react';
import OfferEntity from 'showed/components/offer/entities/offer';
import OfferCard from './offerCard';

export default function Offers() {
    const offers = [
        new OfferEntity('Programme mensuel', '/programme', '/programme.jpg'),
        new OfferEntity('Coaching individuel', '/coaching', '/coaching.jpg'),
    ];
    return (
        <Flex
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={10}
            mt={10}
            mb={10}
        >
            {offers.map((offer) => (
                <OfferCard key={offer.target} offer={offer} />
            ))}
        </Flex>
    );
}
