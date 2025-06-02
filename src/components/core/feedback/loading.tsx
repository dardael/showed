import { ReactNode } from 'react';
import { Spinner } from '@chakra-ui/react';

interface LoadingProps {
    isLoading: boolean;
    children: ReactNode;
}

export default function Loading({ isLoading, children }: LoadingProps) {
    return <>{isLoading ? <Spinner size='xl' /> : children}</>;
}
