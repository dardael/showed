import {
    Button,
    IconButton,
    Input,
    Select,
    Switch,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import {
    createPerson,
    deletePerson,
    getAllInvitedPeople,
    updatePerson,
} from 'showed/controllers/invitation/invitationController';
import { LifeStage } from 'showed/lib/invitation/models/lifeStage';
import { Person } from 'showed/lib/invitation/models/person';

export default function InvitationsList() {
    const [invitedPeople, setInvitedPeople] = useState<Person[]>([]);
    useEffect(() => {
        getAllInvitedPeople().then((people) => {
            setInvitedPeople(people);
        });
    }, []);
    const updatePersonName = (person: Person, name: string) => {
        person.name = name.trim();
        savePersonUpdate(person);
    };

    const updatePersonSurname = (person: Person, surname: string) => {
        person.surname = surname.trim();
        savePersonUpdate(person);
    };
    const updatePersonFamilyId = (person: Person, familyId: string) => {
        person.familyId = familyId.trim();
        savePersonUpdate(person);
    };
    const updatePersonLifeStage = (person: Person, lifeStage: LifeStage) => {
        person.lifeStage = lifeStage;
        savePersonUpdate(person);
    };
    const updatePersonIsInvitedToTownHall = (
        person: Person,
        isInvitedToTownHall: boolean
    ) => {
        person.isInvitedToTownHall = isInvitedToTownHall;
        savePersonUpdate(person);
    };
    const updatePersonIsInvitedToMeal = (
        person: Person,
        isInvitedToMeal: boolean
    ) => {
        person.isInvitedToMeal = isInvitedToMeal;
        savePersonUpdate(person);
    };
    const updatePersonIsInvitedToReception = (
        person: Person,
        isInvitedToReception: boolean
    ) => {
        person.isInvitedToReception = isInvitedToReception;
        savePersonUpdate(person);
    };
    const savePersonUpdate = (person: Person) => {
        updatePerson(person);
        setInvitedPeople(
            invitedPeople.map((p) => {
                if (p._id === person._id) {
                    return person;
                }
                return p;
            })
        );
    };
    const addNewInvitedPerson = async () => {
        const newPerson = await createPerson();
        setInvitedPeople([...invitedPeople, newPerson]);
    };
    const cancelInvitation = async (person: Person) => {
        await deletePerson(person._id as string);
        setInvitedPeople(invitedPeople.filter((p) => p._id !== person._id));
    };
    return (
        <TableContainer>
            <Table>
                <TableCaption>
                    <Button onClick={addNewInvitedPerson}>
                        Ajouter un invité
                    </Button>
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Prénom</Th>
                        <Th>Nom</Th>
                        <Th maxW={'150px'}>{'Enfant / Adulte'}</Th>
                        <Th maxW={'120px'}>{'Famille'}</Th>
                        <Th maxW={'170px'}>{'Invité à la mairie'}</Th>
                        <Th maxW={'210px'}>{"Invité au vin d'honneur"}</Th>
                        <Th maxW={'160px'}>{'Invité au repas'}</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {invitedPeople.map((person) => (
                        <Tr key={person._id}>
                            <Th>
                                <Input
                                    onChange={(event) =>
                                        updatePersonName(
                                            person,
                                            event.target.value
                                        )
                                    }
                                    fontWeight={'initial'}
                                    size={'sm'}
                                    defaultValue={person.name}
                                />
                            </Th>
                            <Th>
                                <Input
                                    onChange={(event) =>
                                        updatePersonSurname(
                                            person,
                                            event.target.value
                                        )
                                    }
                                    fontWeight={'initial'}
                                    size={'sm'}
                                    defaultValue={person.surname}
                                />
                            </Th>
                            <Th maxW={'150px'}>
                                <Select
                                    onChange={(event) =>
                                        updatePersonLifeStage(
                                            person,
                                            event.target.value as LifeStage
                                        )
                                    }
                                    fontWeight={'initial'}
                                    size={'sm'}
                                    defaultValue={person.lifeStage}
                                >
                                    <option value={LifeStage.ADULT}>
                                        Adulte
                                    </option>
                                    <option value={LifeStage.CHILD}>
                                        Enfant
                                    </option>
                                </Select>
                            </Th>
                            <Th maxW={'120px'}>
                                <Input
                                    onChange={(event) =>
                                        updatePersonFamilyId(
                                            person,
                                            event.target.value
                                        )
                                    }
                                    fontWeight={'initial'}
                                    size={'sm'}
                                    defaultValue={person.familyId}
                                />
                            </Th>
                            <Th maxW={'170px'}>
                                <Switch
                                    onChange={(event) =>
                                        updatePersonIsInvitedToTownHall(
                                            person,
                                            event.target.checked
                                        )
                                    }
                                    defaultChecked={person.isInvitedToTownHall}
                                />
                            </Th>
                            <Th maxW={'210px'}>
                                <Switch
                                    onChange={(event) =>
                                        updatePersonIsInvitedToMeal(
                                            person,
                                            event.target.checked
                                        )
                                    }
                                    defaultChecked={person.isInvitedToMeal}
                                />
                            </Th>
                            <Th maxW={'160px'}>
                                <Switch
                                    onChange={(event) =>
                                        updatePersonIsInvitedToReception(
                                            person,
                                            event.target.checked
                                        )
                                    }
                                    defaultChecked={person.isInvitedToReception}
                                />
                            </Th>
                            <Th>
                                <IconButton
                                    variant={'ghost'}
                                    aria-label='Supprimer un invité'
                                    icon={<FaTrash />}
                                    onClick={() => cancelInvitation(person)}
                                />
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
