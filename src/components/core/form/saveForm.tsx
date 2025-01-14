import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { Notification } from '../feedback/notification';

export default function SaveForm<U>({
    children,
    action,
    parameters = [],
}: {
    children: React.ReactNode;
    action: (data: FormData) => Promise<U>;
    parameters?: { key: string; value: string | undefined }[];
}) {
    const notification = new Notification(useToast());
    return (
        <>
            <form
                action={(formData: FormData) => {
                    const promise = action(formData);
                    notification.handlePromise(promise, {
                        success: 'Sauvegardé',
                        error: 'Erreur',
                        loading: 'En cours de sauvegarde',
                    });
                }}
            >
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
                    <Button type='submit'>Enregistrer</Button>
                </Box>
            </form>
        </>
    );
}
