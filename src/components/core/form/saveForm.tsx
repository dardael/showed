import {
    Box,
    Button,
    Heading,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react';
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
    header = '',
    hideBorder = false,
}: {
    children: React.ReactNode;
    action: (data: FormData) => Promise<U>;
    parameters?: { key: string; value: string | undefined }[];
    validateButtonLabel?: string;
    notificationLabels?: { success?: string; error?: string; loading?: string };
    header?: string;
    hideBorder?: boolean;
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
            <Box
                p={4}
                borderWidth={hideBorder ? 0 : 1}
                borderRadius='md'
                mt={4}
            >
                {header && (
                    <Heading size='md' mb={4}>
                        {header}
                    </Heading>
                )}
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align='stretch'>
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
                    </VStack>
                </form>
            </Box>
        </>
    );
}
