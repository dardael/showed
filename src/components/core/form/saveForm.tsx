import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { Notification } from '../feedback/notification';

export default function SaveForm<U>({
    children,
    action,
    parameters = [],
    validateButtonLabel = 'Enregistrer',
    notificationLabels = {
        success: 'Sauvegardé',
        error: 'Erreur',
        loading: 'En cours de sauvegarde',
    },
}: {
    children: React.ReactNode;
    action: (data: FormData) => Promise<U>;
    parameters?: { key: string; value: string | undefined }[];
    validateButtonLabel?: string;
    notificationLabels?: { success?: string; error?: string; loading?: string };
}) {
    const notification = new Notification(useToast());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const promise = action(formData);
        notification.handlePromise(promise, notificationLabels);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                    <Button type='submit'>{validateButtonLabel}</Button>
                </Box>
            </form>
        </>
    );
}
