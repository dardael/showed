import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Icon,
    IconButton,
} from '@chakra-ui/react';
import { FaPlus, FaMinus, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { ReactElement } from 'react';
import { FaTrash } from 'react-icons/fa6';
import ConfirmationButton from '../button/confirmationButton';

export default function DynamicAccordion({
    elements,
}: {
    elements: {
        title: string;
        content: ReactElement;
        reference: any;
        buttons: {
            sort: {
                sortUp: {
                    title: string;
                    action: (element: any) => void;
                };
                sortDown: {
                    title: string;
                    action: (element: any) => void;
                };
            };
            delete: {
                title: string;
                action: (element: any) => void;
                confirmation: {
                    title: string;
                    content: string;
                    acceptButtonTitle: string;
                    cancelButtonTitle: string;
                };
            };
        };
    }[];
}) {
    return (
        <Accordion allowMultiple>
            {elements.map((element, index) => {
                return (
                    <AccordionItem key={index}>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton as={'span'}>
                                        <Box
                                            as='span'
                                            flex='1'
                                            textAlign='left'
                                        >
                                            {element.title}
                                        </Box>
                                        <IconButton
                                            variant={'ghost'}
                                            title={
                                                element.buttons.sort.sortUp
                                                    .title
                                            }
                                            aria-label={
                                                element.buttons.sort.sortUp
                                                    .title
                                            }
                                            icon={<FaAngleUp />}
                                            isDisabled={index === 0}
                                            onClick={(
                                                evt: React.MouseEvent<HTMLButtonElement>
                                            ) => {
                                                evt.stopPropagation();
                                                element.buttons.sort.sortUp.action(
                                                    element.reference
                                                );
                                            }}
                                        />
                                        <IconButton
                                            variant={'ghost'}
                                            title={
                                                element.buttons.sort.sortDown
                                                    .title
                                            }
                                            aria-label={
                                                element.buttons.sort.sortDown
                                                    .title
                                            }
                                            icon={<FaAngleDown />}
                                            isDisabled={
                                                index + 1 === elements.length
                                            }
                                            onClick={(
                                                evt: React.MouseEvent<HTMLButtonElement>
                                            ) => {
                                                evt.stopPropagation();
                                                element.buttons.sort.sortDown.action(
                                                    element.reference
                                                );
                                            }}
                                        />
                                        <ConfirmationButton
                                            button={{
                                                title: element.buttons.delete
                                                    .title,
                                                icon: <FaTrash />,
                                            }}
                                            modal={{
                                                title: element.buttons.delete
                                                    .confirmation.title,
                                                content:
                                                    element.buttons.delete
                                                        .confirmation.content,
                                                confirmText:
                                                    element.buttons.delete
                                                        .confirmation
                                                        .acceptButtonTitle,
                                                cancelText:
                                                    element.buttons.delete
                                                        .confirmation
                                                        .cancelButtonTitle,
                                                onConfirm: () =>
                                                    element.buttons.delete.action(
                                                        element.reference
                                                    ),
                                            }}
                                        />
                                        {isExpanded ? (
                                            <Icon
                                                as={FaMinus}
                                                fontSize='12px'
                                                color={'brand.500'}
                                            />
                                        ) : (
                                            <Icon
                                                as={FaPlus}
                                                fontSize='12px'
                                                color={'brand.500'}
                                            />
                                        )}
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    {element.content}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
