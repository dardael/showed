import { Person } from '../models/person';

export default interface PersonProvider {
    getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]>;
    savePersonInCache(
        sessionId: string,
        filters: {
            name: string;
            surname: string;
        }
    ): Promise<void>;
    getPersonInCache(sessionId: string): Promise<Person | undefined>;
    updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void>;
}
