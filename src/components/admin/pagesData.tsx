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
import DynamicAccordion from '../core/accordion/dynamicAccordion';

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
                        <DynamicAccordion
                            elements={pages.map((page) => ({
                                reference: page,
                                title: page.title,
                                content: (
                                    <PageData
                                        page={page}
                                        onPageChange={async (data) => {
                                            return PageController.savePage(
                                                data
                                            ).then(updatePage);
                                        }}
                                    />
                                ),
                                buttons: {
                                    sort: {
                                        sortUp: {
                                            title: 'Déplacer la page vers le haut',
                                            action: (page) => {
                                                movePage(
                                                    page,
                                                    SortDirection.UP
                                                );
                                            },
                                        },
                                        sortDown: {
                                            title: 'Déplacer la page vers le bas',
                                            action: (page) => {
                                                movePage(
                                                    page,
                                                    SortDirection.DOWN
                                                );
                                            },
                                        },
                                    },
                                    delete: {
                                        title: 'Supprimer la page',
                                        action: (page) => deletePage(page),
                                        confirmation: {
                                            title: 'Supprimer une page',
                                            content: `Souhaitez vous supprimer la page "${page.title}" ?\nLa page sera perdue.`,
                                            acceptButtonTitle: 'Supprimer',
                                            cancelButtonTitle: 'Annuler',
                                        },
                                    },
                                },
                            }))}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
}
