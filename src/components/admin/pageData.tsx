import { Box, Button, Divider, Spinner, useToast } from '@chakra-ui/react';
import SaveForm from '../core/form/saveForm';
import RichTextInput from '../core/form/inputs/richTextInput';
import TextInput from '../core/form/inputs/textInput';
import { Page } from 'showed/lib/page/models/page';
import { useEffect, useState } from 'react';
import * as PageController from 'showed/controllers/page/pageController';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import { Notification } from '../core/feedback/notification';
import { SortDirection } from 'showed/lib/page/models/sortDirection';
import DynamicAccordion from '../core/accordion/dynamicAccordion';
import { FaPlus } from 'react-icons/fa6';
import ComponentData from './page/component/component';

export default function PageData({
    page,
    onPageChange,
}: {
    page: Page;
    onPageChange: (data: FormData) => Promise<any>;
}) {
    const notification = new Notification(useToast());
    const [components, setComponents] = useState<Component[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const addNewComponent = async (componentType: ComponentType) => {
        const newComponent = await PageController.createComponent(
            page._id as string,
            componentType,
            components.length + 1
        );
        components.push(newComponent);
        setComponents([...components]);
    };
    const updateComponent = (updatedComponent: Component) => {
        setComponents([
            ...components.map((component) =>
                component._id === updatedComponent._id
                    ? updatedComponent
                    : component
            ),
        ]);
    };
    const deleteComponent = (componentToDelete: Component) => {
        if (componentToDelete._id === undefined) {
            return;
        }
        notification.handlePromise(
            PageController.deleteComponent(componentToDelete._id).then(
                async () => {
                    const orderedComponents = await updateComponentsPosition();
                    setComponents([
                        ...orderedComponents.filter(
                            (component) =>
                                component._id !== componentToDelete._id
                        ),
                    ]);
                }
            ),
            {
                loading: 'Composant en cours de suppression',
                success: 'Le composant a été supprimé avec succès',
                error: 'Erreur lors de la suppression du composant',
            }
        );
    };
    const moveComponent = async (
        componentToMove: Component,
        direction: SortDirection
    ) => {
        notification.handlePromise(
            PageController.moveComponent(componentToMove, direction).then(
                async () => {
                    const orderedComponents = await updateComponentsPosition();
                    setComponents([...orderedComponents]);
                }
            ),
            {
                loading: 'Composant en cours de déplacement',
                success: 'Le composant a été déplacé avec succès',
                error: 'Erreur lors du déplacement du composant',
            }
        );
    };
    const updateComponentsPosition = async () => {
        const componentsWithUpdatedPosition =
            await PageController.getComponents(page._id as string);
        components.forEach((component) => {
            const updatedComponent = componentsWithUpdatedPosition.find(
                (p) => p._id === component._id
            );
            if (updatedComponent) {
                component.position = updatedComponent.position;
            }
        });
        components.sort((a, b) => a.position - b.position);
        return components;
    };
    useEffect(() => {
        PageController.getComponents(page._id as string).then(
            async (foundComponents: Component[]) => {
                setComponents([...foundComponents]);
                setIsLoading(false);
            }
        );
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    <SaveForm
                        parameters={[
                            { key: 'id', value: page._id },
                            { key: 'position', value: page.position },
                        ]}
                        action={onPageChange}
                    >
                        <TextInput
                            isRequired
                            name='title'
                            label='Titre'
                            placeholder='Titre affiché dans le menu'
                            defaultValue={page?.title}
                        />
                    </SaveForm>
                    <Box
                        paddingTop={'20px'}
                        paddingLeft={'20px'}
                        paddingRight={'20px'}
                    />
                    <Divider />
                    <Box
                        paddingTop={'20px'}
                        paddingLeft={'20px'}
                        paddingRight={'20px'}
                    >
                        <Button
                            title='Ajouter un composant'
                            aria-label={'Ajouter un composant'}
                            leftIcon={<FaPlus />}
                            onClick={() =>
                                addNewComponent(ComponentType.RICH_TEXT_EDITOR)
                            }
                            position='absolute'
                            right='95px'
                        >
                            Ajouter un composant
                        </Button>
                        <Box paddingTop={'55px'}>
                            <DynamicAccordion
                                elements={components.map((component) => ({
                                    reference: component,
                                    title: component.title,
                                    content: (
                                        <ComponentData
                                            component={component}
                                            onSave={async (data) => {
                                                const pendingSave =
                                                    PageController.saveComponent(
                                                        data
                                                    );
                                                pendingSave.then(
                                                    updateComponent
                                                );
                                                return pendingSave;
                                            }}
                                        />
                                    ),
                                    buttons: {
                                        sort: {
                                            sortUp: {
                                                title: 'Déplacer le composant vers le haut',
                                                action: (component) => {
                                                    moveComponent(
                                                        component,
                                                        SortDirection.UP
                                                    );
                                                },
                                            },
                                            sortDown: {
                                                title: 'Déplacer le composant vers le bas',
                                                action: (component) => {
                                                    moveComponent(
                                                        component,
                                                        SortDirection.DOWN
                                                    );
                                                },
                                            },
                                        },
                                        delete: {
                                            title: 'Supprimer la component',
                                            action: (component) =>
                                                deleteComponent(component),
                                            confirmation: {
                                                title: 'Supprimer un composant',
                                                content: `Souhaitez vous supprimer le composant "${component.title}" ?\nLe composant sera perdue.`,
                                                acceptButtonTitle: 'Supprimer',
                                                cancelButtonTitle: 'Annuler',
                                            },
                                        },
                                    },
                                }))}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
