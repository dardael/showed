'use client';
import { Box, Button, Input } from '@chakra-ui/react';

export default function SaveForm({
    children,
    action = (data: FormData) => {},
    parameters = [],
}: {
    children: React.ReactNode;
    action?: (data: FormData) => void;
    parameters?: { key: string; value: any }[];
}) {
    return (
        <>
            <form action={action}>
                {parameters.map((parameter) => (
                    <Input
                        type='hidden'
                        key={parameter.key}
                        name={parameter.key}
                        value={parameter.value}
                    />
                ))}
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
