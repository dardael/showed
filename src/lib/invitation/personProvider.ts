import PersonRepository from './personRepository';
import PersonProviderInterface from './service/personProvider';
import { Person } from './models/person';
import Cache from '../core/cache/service/cache';

export default class PersonProvider implements PersonProviderInterface {
    constructor(
        private repository: PersonRepository,
        private cache: Cache
    ) {
        this.repository = repository;
        this.cache = cache;
    }

    public async updatePerson(person: Person): Promise<void> {
        return this.repository.updatePerson(person);
    }

    public getAllInvitedPeople(): Promise<Person[]> {
        return this.repository.getAllInvitedPeople();
    }

    public getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]> {
        return this.repository.getFamilyMembers(filters);
    }

    public savePersonInCache(
        sessionId: string,
        filters: {
            name: string;
            surname: string;
        }
    ): Promise<void> {
        const promise = this.repository
            .getPerson(filters)
            .then((person) =>
                this.cache.set<Person>(sessionId + 'person', person)
            );
        return promise;
    }

    public async deletePersonInCache(sessionId: string): Promise<void> {
        this.cache.delete(sessionId + 'person');
        return Promise.resolve();
    }

    public getPersonInCache(sessionId: string): Promise<Person | undefined> {
        const person = this.cache.get<Person>(sessionId + 'person');
        return Promise.resolve(person);
    }

    public updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
            hasAcceptedTownHallInvitation: boolean;
        }[]
    ): Promise<void> {
        return this.repository.updateFamilyMembers(familyMembers);
    }

    public async createPerson(): Promise<Person> {
        return this.repository.createPerson();
    }

    public async deletePerson(personId: string): Promise<void> {
        return this.repository.deletePerson(personId);
    }
}
