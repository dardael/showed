import { Box, Button, Input } from '@chakra-ui/react';

export default function SearchForm({
    children,
    action,
    parameters = [],
}: {
    children: React.ReactNode;
    action: (data: FormData) => Promise<void>;
    parameters?: { key: string; value: string }[];
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
