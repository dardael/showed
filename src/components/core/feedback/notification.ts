import { useToast } from '@chakra-ui/react';

export class Notification {
    constructor(private toast: ReturnType<typeof useToast>) {}
    public handlePromise<U>(
        promise: Promise<U>,
        messages: { success?: string; error?: string; loading?: string }
    ) {
        return this.toast.promise(promise, {
            success: this.getNotification(messages.success),
            error: this.getNotification(messages.error),
            loading: this.getNotification(messages.loading),
        });
    }

    private getNotification(message?: string): {
        title: string;
        variant: 'solid';
        position: 'bottom-right';
        isClosable: boolean;
        duration: number;
    } {
        return message
            ? {
                  title: message,
                  variant: 'solid',
                  position: 'bottom-right',
                  isClosable: true,
                  duration: 5000,
              }
            : {
                  title: '',
                  variant: 'solid',
                  position: 'bottom-right',
                  isClosable: false,
                  duration: 0,
              };
    }
}
