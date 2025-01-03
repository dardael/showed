import { Person } from '../models/person';

export default interface PersonProvider {
    getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]>;
    savePersonInCache(filters: {
        name: string;
        surname: string;
    }): Promise<void>;
    getPersonInCache(): Promise<Person | undefined>;
    updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void>;
}
