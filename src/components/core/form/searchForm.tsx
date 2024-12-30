import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { Notification } from '../feedback/notification';

export default function SearchForm({
    children,
    action,
    parameters = [],
}: {
    children: React.ReactNode;
    action: (data: FormData) => Promise<any>;
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
                <Box textAlign={'center'} paddingTop={'20px'}>
                    <Button type='submit'>Rechercher</Button>
                </Box>
            </form>
        </>
    );
}
