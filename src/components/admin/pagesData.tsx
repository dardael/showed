import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Icon,
    IconButton,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import PageData from './pageData';
import { FaPlus, FaMinus, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import type { Page } from 'showed/lib/page/models/page';
import * as PageController from 'showed/controllers/page/pageController';
import { FaTrash } from 'react-icons/fa6';
import ConfirmationButton from '../core/button/confirmationButton';
import { Notification } from '../core/feedback/notification';
import { SortDirection } from 'showed/lib/page/models/sortDirection';

export default function PagesData() {
    const notification = new Notification(useToast());
    const [pages, setPages] = useState<Page[]>([]);
    const addNewPage = async () => {
        const newPage = await PageController.createPage(pages.length + 1);
        pages.push(newPage);
        setPages([...pages]);
    };
    const updatePage = (updatedPage: Page) => {
        setPages([
            ...pages.map((page) =>
                page._id === updatedPage._id ? updatedPage : page
            ),
        ]);
    };
    const deletePage = (pageToDelete: Page) => {
        if (pageToDelete._id === undefined) {
            return;
        }
        notification.handlePromise(
            PageController.deletePage(pageToDelete._id).then(async () => {
                const orderedPages = await updatePagesPosition();
                setPages([
                    ...orderedPages.filter(
                        (page) => page._id !== pageToDelete._id
                    ),
                ]);
            }),
            {
                loading: 'Page en cours de suppression',
                success: 'La page a été supprimée avec succès',
                error: 'Erreur lors de la suppression de la page',
            }
        );
    };
    const movePage = async (pageToMove: Page, direction: SortDirection) => {
        notification.handlePromise(
            PageController.movePage(pageToMove, direction).then(async () => {
                const orderedPages = await updatePagesPosition();
                setPages([...orderedPages]);
            }),
            {
                loading: 'Page en cours de déplacement',
                success: 'La page a été déplacée avec succès',
                error: 'Erreur lors du déplacement de la page',
            }
        );
    };
    const updatePagesPosition = async () => {
        const pagesWithUpdatedPosition = await PageController.getPages();
        pages.forEach((page) => {
            const updatedPage = pagesWithUpdatedPosition.find(
                (p) => p._id === page._id
            );
            if (updatedPage) {
                page.position = updatedPage.position;
            }
        });
        pages.sort((a, b) => a.position - b.position);
        return pages;
    };
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        PageController.getPages().then((foundPages: Page[]) => {
            setPages(foundPages);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box>
                    <Button
                        title='Ajouter une page'
                        aria-label={'Ajouter une page'}
                        leftIcon={<FaPlus />}
                        onClick={addNewPage}
                        position='absolute'
                        right='0'
                    >
                        Ajouter une page
                    </Button>
                    <Box paddingTop={'55px'}>
                        <Accordion allowMultiple>
                            {pages.map((page, index) => {
                                return (
                                    <AccordionItem key={index}>
                                        {({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <AccordionButton
                                                        as={'span'}
                                                    >
                                                        <Box
                                                            as='span'
                                                            flex='1'
                                                            textAlign='left'
                                                        >
                                                            {page.title}
                                                        </Box>
                                                        <IconButton
                                                            variant={'ghost'}
                                                            title={
                                                                'Déplacer la page vers le haut'
                                                            }
                                                            aria-label={
                                                                'Déplacer la page vers le haut'
                                                            }
                                                            icon={<FaAngleUp />}
                                                            isDisabled={
                                                                index === 0
                                                            }
                                                            onClick={(
                                                                evt: React.MouseEvent<HTMLButtonElement>
                                                            ) => {
                                                                evt.stopPropagation();
                                                                movePage(
                                                                    page,
                                                                    SortDirection.UP
                                                                );
                                                            }}
                                                        />
                                                        <IconButton
                                                            variant={'ghost'}
                                                            title={
                                                                'Déplacer la page vers le bas'
                                                            }
                                                            aria-label={
                                                                'Déplacer la page vers le bas'
                                                            }
                                                            icon={
                                                                <FaAngleDown />
                                                            }
                                                            isDisabled={
                                                                index + 1 ===
                                                                pages.length
                                                            }
                                                            onClick={(
                                                                evt: React.MouseEvent<HTMLButtonElement>
                                                            ) => {
                                                                evt.stopPropagation();
                                                                movePage(
                                                                    page,
                                                                    SortDirection.DOWN
                                                                );
                                                            }}
                                                        />
                                                        <ConfirmationButton
                                                            button={{
                                                                title: 'Supprimer la page',
                                                                icon: (
                                                                    <FaTrash />
                                                                ),
                                                            }}
                                                            modal={{
                                                                title: 'Supprimer une page',
                                                                content: `Souhaitez vous supprimer la page "${page.title}" ?\nLa page sera perdue.`,
                                                                confirmText:
                                                                    'Supprimer',
                                                                cancelText:
                                                                    'Annuler',
                                                                onConfirm: () =>
                                                                    deletePage(
                                                                        page
                                                                    ),
                                                            }}
                                                        />
                                                        {isExpanded ? (
                                                            <Icon
                                                                as={FaMinus}
                                                                fontSize='12px'
                                                            />
                                                        ) : (
                                                            <Icon
                                                                as={FaPlus}
                                                                fontSize='12px'
                                                            />
                                                        )}
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel>
                                                    <PageData
                                                        page={page}
                                                        onPageChange={async (
                                                            data
                                                        ) => {
                                                            return PageController.savePage(
                                                                data
                                                            ).then(updatePage);
                                                        }}
                                                    />
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </Box>
                </Box>
            )}
        </>
    );
}
