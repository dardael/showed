'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import InvitationsList from 'showed/components/admin/invitations/invitationsList';
import InvitatedPeople from 'showed/components/admin/invitations/invitedPeople';
import { getAllInvitedPeople } from 'showed/controllers/invitation/invitationController';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs>
                <TabList>
                    <Tab>{'Gestion des invitations'}</Tab>
                    <Tab>{'Liste des invités à la mairie'}</Tab>
                    <Tab>{"Liste des invités au vin d'honneur"}</Tab>
                    <Tab>{'Liste des invités au repas'}</Tab>
                    <Tab>{"Liste des invités venant au vin d'honneur"}</Tab>
                    <Tab>{'Liste des invités venant au repas'}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <InvitationsList />
                    </TabPanel>
                    <TabPanel>
                        <InvitatedPeople
                            loadInvitedPeople={async () => {
                                const invitedPeople =
                                    await getAllInvitedPeople();
                                return invitedPeople.filter(
                                    (person) => person.isInvitedToTownHall
                                );
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <InvitatedPeople
                            loadInvitedPeople={async () => {
                                const invitedPeople =
                                    await getAllInvitedPeople();
                                return invitedPeople.filter(
                                    (person) => person.isInvitedToReception
                                );
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <InvitatedPeople
                            loadInvitedPeople={async () => {
                                const invitedPeople =
                                    await getAllInvitedPeople();
                                return invitedPeople.filter(
                                    (person) => person.isInvitedToMeal
                                );
                            }}
                        />
                    </TabPanel>

                    <TabPanel>
                        <InvitatedPeople
                            loadInvitedPeople={async () => {
                                const invitedPeople =
                                    await getAllInvitedPeople();
                                return invitedPeople.filter(
                                    (person) =>
                                        person.hasAcceptedReceptionInvitation
                                );
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <InvitatedPeople
                            loadInvitedPeople={async () => {
                                const invitedPeople =
                                    await getAllInvitedPeople();
                                return invitedPeople.filter(
                                    (person) => person.hasAcceptedMealInvitation
                                );
                            }}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
