'use client';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
} from '@vis.gl/react-google-maps';
import Loading from 'showed/components/core/feedback/loading';

export default function Map({ localization }: { localization: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const position = localization.split(',');
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
                <Loading isLoading={isLoading}>
                    <GoogleMap defaultCenter={center} defaultZoom={14}>
                        <Marker position={center} />
                    </GoogleMap>
                </Loading>
            </APIProvider>
        </Box>
    );
}
