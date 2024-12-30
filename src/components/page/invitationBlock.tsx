'use client';
import {
    Box,
    Button,
    Center,
    Heading,
    SimpleGrid,
    Switch,
    Text,
    useToast,
} from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { Block as BlockModel } from 'showed/lib/page/models/block';
import TextInput from '../core/form/inputs/textInput';
import {
    getFamilyMembers,
    updateFamilyMembers,
} from 'showed/controllers/invitation/invitationController';
import Alert from '../core/feedback/alert';
import { useContext, useEffect, useState } from 'react';
import { Person } from 'showed/lib/invitation/models/person';
import SearchForm from '../core/form/searchForm';
import { Font } from 'showed/lib/theme/models/font';
import getFontFamily from '../core/font/font';
import { ThemeContext } from 'showed/app/providers';
import { Notification } from '../core/feedback/notification';

export default function InvitationBlock({ block }: { block: BlockModel }) {
    const notification = new Notification(useToast());
    const [mustShowNosUserFoundAlert, setMustShowNoUserFoundAlert] =
        useState(false);
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
        ''
    );
    const [familyMembers, setFamilyMembers] = useState<Person[]>([]);
    useEffect(() => {
        if (block.backgroundImageId) {
            getFile(block.backgroundImageId).then((file) =>
                setBackgroundImage(file?.filepath.replace('./public', ''))
            );
        }
    }, []);
    const { theme } = useContext(ThemeContext);
    const searchInvitedUsers = async (formData: FormData) => {
        const familyMembers = await getFamilyMembers(formData);
        if (familyMembers.length === 0) {
            setMustShowNoUserFoundAlert(true);
        }
        setFamilyMembers(familyMembers);
    };

    const updateMealInvitationResponse = async (
        personId: string,
        hasAccepted: boolean
    ) => {
        setFamilyMembers([
            ...familyMembers.map((person) =>
                person._id === personId
                    ? { ...person, hasAcceptedMealInvitation: hasAccepted }
                    : person
            ),
        ]);
    };
    const updateReceptionInvitationResponse = async (
        personId: string,
        hasAccepted: boolean
    ) => {
        setFamilyMembers([
            ...familyMembers.map((person) =>
                person._id === personId
                    ? { ...person, hasAcceptedReceptionInvitation: hasAccepted }
                    : person
            ),
        ]);
    };

    const submitInvitationResponses = async () => {
        notification.handlePromise(
            updateFamilyMembers(
                familyMembers.map((person) => {
                    return {
                        personId: person._id as string,
                        hasAcceptedMealInvitation:
                            !!person.hasAcceptedMealInvitation,
                        hasAcceptedReceptionInvitation:
                            !!person.hasAcceptedReceptionInvitation,
                    };
                })
            ),
            {
                success:
                    'Nous vous remercions pour votre réponse. Elle a bien été enregistrée.',
                error: "Une erreur c'est produite, veuillez recommencer. Si le probléme persiste n'hésitez pas à nous contacter",
                loading: 'Réponse en cours de traitement',
            }
        );
    };

    return (
        <Box
            backgroundImage={backgroundImage}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
            padding={'10px'}
            width={'100%'}
        >
            <Box
                padding={'10px'}
                borderRadius={'10px'}
                {...(block.hasTransparentBackground && {
                    backgroundColor: '#FFFFFFBD',
                    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.22)',
                })}
            >
                <Center>
                    <Heading
                        as='h1'
                        size='xl'
                        color={theme.color + '.500'}
                        fontWeight={'500'}
                        fontFamily={getFontFamily(Font.ADVENT_PRO)}
                    >
                        Votre réponse
                    </Heading>
                </Center>
                {familyMembers.length === 0 && (
                    <Box paddingRight='20px' paddingLeft={'20px'}>
                        <Center paddingTop={'10px'} paddingBottom={'20px'}>
                            <Text
                                fontFamily={getFontFamily(Font.ROBOTO_FLEX)}
                                textAlign={'center'}
                                size={'md'}
                            >
                                Veillez vous identifier pour pouvoir confirmer
                                votre présence ainsi que celle des membres de
                                votre famille.
                            </Text>
                        </Center>
                        <SearchForm action={searchInvitedUsers}>
                            <TextInput
                                isRequired
                                name='name'
                                label='Nom de famille'
                                placeholder='Nom de famille'
                            />
                            <TextInput
                                isRequired
                                name='surname'
                                label='Prénom'
                                placeholder='Prénom'
                            />
                        </SearchForm>
                        <Alert
                            isOpen={mustShowNosUserFoundAlert}
                            title='Aucun invité trouvé'
                            content='Aucun invité trouvé à partir des informations saisies.'
                            confirmText='OK'
                            onConfirm={() => setMustShowNoUserFoundAlert(false)}
                        />
                    </Box>
                )}
                {!!familyMembers.length && (
                    <Box paddingRight='20px' paddingLeft={'20px'}>
                        <Center paddingTop={'10px'} paddingBottom={'20px'}>
                            <Text
                                fontFamily={getFontFamily(Font.ROBOTO_FLEX)}
                                textAlign={'center'}
                                size={'md'}
                            >
                                {familyMembers[0].isInvitedToMeal &&
                                    !familyMembers[0].isInvitedToReception &&
                                    'Nous avons le plaisir de vous convier au repas'}
                                {!familyMembers[0].isInvitedToMeal &&
                                    familyMembers[0].isInvitedToReception &&
                                    "Nous avons le plaisir de vous convier au vin d'honneur"}
                                {familyMembers[0].isInvitedToMeal &&
                                    familyMembers[0].isInvitedToReception &&
                                    "Nous avons le plaisir de vous convier au vin d'honneur ainsi qu'au repas"}
                            </Text>
                        </Center>
                        {familyMembers.map((person) => (
                            <Box key={person._id}>
                                <Text
                                    fontFamily={getFontFamily(Font.ROBOTO_FLEX)}
                                    size={'md'}
                                >
                                    {person.name} {person.surname} sera
                                    présent(e)
                                </Text>
                                <SimpleGrid
                                    columns={2}
                                    spacing={2}
                                    paddingTop={2}
                                    paddingBottom={5}
                                    paddingLeft={5}
                                    paddingRight={5}
                                >
                                    {person.isInvitedToReception && (
                                        <Text
                                            fontFamily={getFontFamily(
                                                Font.ROBOTO_FLEX
                                            )}
                                            size={'md'}
                                        >
                                            {"au vin d'honneur"}
                                        </Text>
                                    )}
                                    {person.isInvitedToReception && (
                                        <Switch
                                            isChecked={
                                                person.hasAcceptedReceptionInvitation
                                            }
                                            title={
                                                person.hasAcceptedReceptionInvitation
                                                    ? 'Présence confirmée'
                                                    : 'Invitation déclinée'
                                            }
                                            onChange={(isChecked) =>
                                                updateReceptionInvitationResponse(
                                                    person._id as string,
                                                    isChecked.target.checked
                                                )
                                            }
                                        />
                                    )}
                                    {person.isInvitedToMeal && (
                                        <Text
                                            fontFamily={getFontFamily(
                                                Font.ROBOTO_FLEX
                                            )}
                                            size={'md'}
                                        >
                                            au repas
                                        </Text>
                                    )}
                                    {person.isInvitedToMeal && (
                                        <Switch
                                            isChecked={
                                                person.hasAcceptedMealInvitation
                                            }
                                            title={
                                                person.hasAcceptedMealInvitation
                                                    ? 'Présence confirmée'
                                                    : 'Invitation déclinée'
                                            }
                                            onChange={(isChecked) =>
                                                updateMealInvitationResponse(
                                                    person._id as string,
                                                    isChecked.target.checked
                                                )
                                            }
                                        />
                                    )}
                                </SimpleGrid>
                            </Box>
                        ))}
                        <Box
                            textAlign={'center'}
                            paddingTop={'10px'}
                            paddingBottom={'5px'}
                        >
                            <Button onClick={submitInvitationResponses}>
                                Envoyer votre réponse
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
