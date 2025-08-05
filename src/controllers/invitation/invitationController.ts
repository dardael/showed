'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Person } from 'showed/lib/invitation/models/person';
import PersonProvider from 'showed/lib/invitation/service/personProvider';
import { getSessionId } from '../cookies/sessionController';
import { getService } from 'showed/lib/core/dependencyInjection/getter';

export async function getAllInvitedPeople(): Promise<Person[]> {
    const personService: PersonProvider = getService('PersonProvider');
    return personService.getAllInvitedPeople();
}

export async function getFamilyMembers(data: FormData): Promise<Person[]> {
    const name = data.get('name')?.toString() as string;
    const surname = data.get('surname')?.toString() as string;

    return getFamilyMembersFromNameAndSurname({ name, surname });
}

export async function getFamilyMembersFromNameAndSurname(person: {
    name: string;
    surname: string;
}): Promise<Person[]> {
    const personService: PersonProvider = getService('PersonProvider');

    return personService.getFamilyMembers(person);
}

export async function updateFamilyMembers(
    familyMembers: {
        personId: string;
        hasAcceptedMealInvitation: boolean;
        hasAcceptedReceptionInvitation: boolean;
        hasAcceptedTownHallInvitation: boolean;
    }[]
): Promise<void> {
    const personService: PersonProvider = getService('PersonProvider');
    return personService.updateFamilyMembers(familyMembers);
}

export async function updatePerson(person: Person): Promise<void> {
    const personService: PersonProvider = getService('PersonProvider');
    return personService.updatePerson(person);
}

export async function createPerson(): Promise<Person> {
    const personService: PersonProvider = getService('PersonProvider');
    return personService.createPerson();
}

export async function deletePerson(personId: string): Promise<void> {
    const personService: PersonProvider = getService('PersonProvider');
    return personService.deletePerson(personId);
}

export async function savePersonInCache(data: FormData): Promise<void> {
    const sessionId = (await getSessionId(true)) as string;
    const name = data.get('name')?.toString() as string;
    const surname = data.get('surname')?.toString() as string;
    const personService: PersonProvider = getService('PersonProvider');
    personService.savePersonInCache(sessionId, { name, surname });
}

export async function deletePersonInCache(): Promise<void> {
    const sessionId = (await getSessionId(true)) as string;
    const personService: PersonProvider = getService('PersonProvider');
    personService.deletePersonInCache(sessionId);
}

export async function getPersonInCache(): Promise<Person | undefined> {
    const personService: PersonProvider = getService('PersonProvider');
    const sessionId = await getSessionId();
    if (!sessionId) {
        return undefined;
    }
    return personService.getPersonInCache(sessionId);
}
