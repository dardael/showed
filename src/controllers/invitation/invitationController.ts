'use server';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';
import 'showed/lib/core/dependencyInjection/container';
import { Person } from 'showed/lib/invitation/models/person';
import PersonProvider from 'showed/lib/invitation/service/personProvider';
import { Container } from 'typedi';

export async function getFamilyMembers(data: FormData): Promise<Person[]> {
    const name = data.get('name')?.toString() as string;
    const surname = data.get('surname')?.toString() as string;

    return getFamilyMembersFromNameAndSurname({ name, surname });
}

export async function getFamilyMembersFromNameAndSurname(person: {
    name: string;
    surname: string;
}): Promise<Person[]> {
    const personService: PersonProvider = Container.get('PersonProvider');

    return personService.getFamilyMembers(person);
}

export async function updateFamilyMembers(
    familyMembers: {
        personId: string;
        hasAcceptedMealInvitation: boolean;
        hasAcceptedReceptionInvitation: boolean;
    }[]
): Promise<void> {
    const personService: PersonProvider = Container.get('PersonProvider');
    return personService.updateFamilyMembers(familyMembers);
}

export async function savePersonInCache(data: FormData): Promise<void> {
    const sessionId = cookies().get('sessionId');
    if (!sessionId) {
        cookies().set('sessionId', nanoid());
    }
    const name = data.get('name')?.toString() as string;
    const surname = data.get('surname')?.toString() as string;
    const personService: PersonProvider = Container.get('PersonProvider');
    personService.savePersonInCache({ name, surname });
}

export async function getPersonInCache(): Promise<Person | undefined> {
    const personService: PersonProvider = Container.get('PersonProvider');
    try {
        return personService.getPersonInCache();
    } catch (error) {
        return undefined;
    }
}
