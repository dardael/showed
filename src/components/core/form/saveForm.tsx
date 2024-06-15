'use client';
import { Box, Button } from '@chakra-ui/react';

export default function SaveForm({
    children,
    action = (data: FormData) => {},
}: {
    children: React.ReactNode;
    action?: (data: FormData) => void;
}) {
    return (
        <>
            <form action={action}>
                {children}
                <Box textAlign={'right'} paddingTop={'20px'}>
                    <Button color='white' colorScheme='red' type='submit'>
                        Enregistrer
                    </Button>
                </Box>
            </form>
        </>
    );
}
