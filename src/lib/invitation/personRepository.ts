import { Person } from './models/person';

export default interface PersonRepository {
    getAllInvitedPeople(): Promise<Person[]>;
    getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]>;
    getPerson(filters: { name: string; surname: string }): Promise<Person>;
    updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void>;
    updatePerson(person: Person): Promise<void>;
    createPerson(): Promise<Person>;
    deletePerson(personId: string): Promise<void>;
}
