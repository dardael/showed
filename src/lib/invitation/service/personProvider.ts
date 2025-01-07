import { Person } from '../models/person';

export default interface PersonProvider {
    getAllInvitedPeople(): Promise<Person[]>;
    getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]>;
    createPerson(): Promise<Person>;
    deletePerson(personId: string): Promise<void>;
    updatePerson(person: Person): Promise<void>;
    savePersonInCache(
        sessionId: string,
        filters: {
            name: string;
            surname: string;
        }
    ): Promise<void>;
    deletePersonInCache(sessionId: string): Promise<void>;
    getPersonInCache(sessionId: string): Promise<Person | undefined>;
    updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void>;
}
