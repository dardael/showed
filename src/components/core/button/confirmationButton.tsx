import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function ConfirmationButton({
    modal,
    button,
}: {
    modal: {
        title: string;
        content: string;
        confirmText: string;
        cancelText: string;
        onConfirm: () => void;
    };
    button: {
        title: string;
        icon: ReactElement;
    };
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <IconButton
                variant={'ghost'}
                title={button.title}
                aria-label={button.title}
                icon={button.icon}
                onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                    evt.stopPropagation();
                    onOpen();
                }}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modal.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{modal.content}</ModalBody>
                    <ModalFooter>
                        {' '}
                        <Button mr={3} variant='ghost' onClick={onClose}>
                            {modal.cancelText}
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={() => {
                                modal.onConfirm();
                                onClose();
                            }}
                        >
                            {modal.confirmText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
