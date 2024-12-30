import PersonRepository from './personRepository';
import PersonProviderInterface from './service/personProvider';
import { Person } from './models/person';

export default class PersonProvider implements PersonProviderInterface {
    constructor(private repository: PersonRepository) {
        this.repository = repository;
    }

    public getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]> {
        return this.repository.getFamilyMembers(filters);
    }

    public updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void> {
        return this.repository.updateFamilyMembers(familyMembers);
    }
}
