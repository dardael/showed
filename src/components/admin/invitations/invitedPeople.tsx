import {
    Button,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LifeStage } from 'showed/lib/invitation/models/lifeStage';
import { Person } from 'showed/lib/invitation/models/person';

export default function InvitatedPeople({
    loadInvitedPeople,
}: {
    loadInvitedPeople: () => Promise<Person[]>;
}) {
    const [invitedPeople, setInvitedPeople] = useState<Person[]>([]);
    useEffect(() => {
        loadInvitedPeople().then((people) => {
            setInvitedPeople(people);
        });
    }, []);
    return (
        <TableContainer>
            <Table>
                <TableCaption>
                    <Button
                        onClick={() =>
                            loadInvitedPeople().then((people) =>
                                setInvitedPeople(people)
                            )
                        }
                    >
                        Rafraichir
                    </Button>
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Prénom</Th>
                        <Th>Nom</Th>
                        <Th maxW={'150px'}>{'Enfant / Adulte'}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {invitedPeople.map((person) => (
                        <Tr key={person._id}>
                            <Th>{person.name}</Th>
                            <Th>{person.surname}</Th>
                            <Th maxW={'150px'}>
                                {person.lifeStage === LifeStage.ADULT
                                    ? 'Adulte'
                                    : 'Enfant'}
                            </Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
