import { Person } from './models/person';

export default interface PersonRepository {
    getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]>;
    updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void>;
}
