import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import React from 'react';

export default function Alert({
    isOpen,
    title,
    content,
    confirmText,
    onConfirm,
}: {
    isOpen: boolean;
    title: string;
    content: string;
    confirmText: string;
    onConfirm: () => void;
}) {
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onConfirm}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogBody>{content}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
