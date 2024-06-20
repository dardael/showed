import { useToast } from '@chakra-ui/react';

export class Notification {
    constructor(private toast: ReturnType<typeof useToast>) {}
    public handlePromise(
        promise: Promise<any>,
        messages: { success: string; error: string; loading: string }
    ) {
        return this.toast.promise(promise, {
            success: this.getNotification(messages.success),
            error: this.getNotification(messages.error),
            loading: this.getNotification(messages.loading),
        });
    }

    private getNotification(message: string): {
        title: string;
        variant: 'solid';
        position: 'bottom-right';
        isClosable: boolean;
        duration: number;
    } {
        return {
            title: message,
            variant: 'solid',
            position: 'bottom-right',
            isClosable: true,
            duration: 5000,
        };
    }
}
