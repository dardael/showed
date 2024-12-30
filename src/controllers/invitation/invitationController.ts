'use server';
import 'showed/lib/core/dependencyInjection/container';
import { Person } from 'showed/lib/invitation/models/person';
import PersonProvider from 'showed/lib/invitation/service/personProvider';
import { Container } from 'typedi';

export async function getFamilyMembers(data: FormData): Promise<Person[]> {
    const name = data.get('name')?.toString() as string;
    const surname = data.get('surname')?.toString() as string;
    const personService: PersonProvider = Container.get('PersonProvider');
    return personService.getFamilyMembers({ name, surname });
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
