'use client';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import { useState } from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
} from '@vis.gl/react-google-maps';

export default function Map({ component }: { component: ComponentModel }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const position = component.content.split(',');
    const center = {
        lat: Number.parseFloat(position[0]),
        lng: Number.parseFloat(position[1]),
    };

    return (
        <Box height={'300px'} width={'300px'} borderRadius={'5px'}>
            <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
                onLoad={() => setIsLoading(false)}
            >
                {isLoading ? (
                    <Center>
                        {' '}
                        <Spinner size={'xl'} />
                    </Center>
                ) : (
                    <GoogleMap defaultCenter={center} defaultZoom={14}>
                        <Marker position={center} />
                    </GoogleMap>
                )}
            </APIProvider>
        </Box>
    );
}
