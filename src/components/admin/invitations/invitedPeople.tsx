import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Divider,
    Heading,
    Stack,
    StackDivider,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
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
        <>
            <Card>
                <CardHeader>
                    <Heading size='md'>Résumé</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                {"Nombre d'enfant"}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {
                                    invitedPeople.filter(
                                        (person) =>
                                            person.lifeStage === LifeStage.CHILD
                                    ).length
                                }
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                {"Nombre d'adulte"}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {
                                    invitedPeople.filter(
                                        (person) =>
                                            person.lifeStage === LifeStage.ADULT
                                    ).length
                                }
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                {'Nombre total'}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {invitedPeople.length}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Divider padding={'25px'} />
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
                                <Td>{person.name}</Td>
                                <Td>{person.surname}</Td>
                                <Td maxW={'150px'}>
                                    {person.lifeStage === LifeStage.ADULT
                                        ? 'Adulte'
                                        : 'Enfant'}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
