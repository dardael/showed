'use client';
import React, { useEffect, useState } from 'react';
import { Image as ChakraImage, ImageProps, Spinner } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import Loading from './feedback/loading';

export default function Image({
    fileId,
    ...props
}: { fileId: string } & ImageProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [image, setImage] = useState<string | null>(null);
    useEffect(() => {
        getFile(fileId).then((image) => {
            setImage(
                (image?.filepath.startsWith('./public')
                    ? image?.filepath.replace('./public', '')
                    : image?.filepath) as string
            );
            setIsLoading(false);
        });
    }, [fileId]);

    return (
        <Loading isLoading={isLoading}>
            {' '}
                <ChakraImage src={image as string} {...props} />
            {' '}
        </Loading>
    );
}
