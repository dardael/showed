import { ReactNode } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

interface LoadingProps {
    isLoading: boolean;
    children: ReactNode;
}

export default function Loading({ isLoading, children }: LoadingProps) {
    return (
        <>
            {isLoading ? (
                <Flex justify='center' align='center' height='100%'>
                    <Spinner
                        size='xl'
                        speed='1s'
                        emptyColor='gray.200'
                        thickness='4px'
                        title='Chargement...'
                    />
                </Flex>
            ) : (
                children
            )}
        </>
    );
}
