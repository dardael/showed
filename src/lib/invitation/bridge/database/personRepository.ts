import { PersonModel } from 'showed/lib/invitation/models/person';
import type { Person } from 'showed/lib/invitation/models/person';
import type Database from 'showed/lib/core/database/service/database';
import PersonRepositoryInterface from 'showed/lib/invitation/personRepository';
import { LifeStage } from '../../models/lifeStage';

export default class PersonRepository implements PersonRepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async createPerson(): Promise<Person> {
        return this.database.create<Person>(PersonModel, {
            name: '',
            familyId: '',
            surname: '',
            lifeStage: LifeStage.ADULT,
        });
    }

    public async getAllInvitedPeople(): Promise<Person[]> {
        return this.database.find<Person>(PersonModel, {});
    }

    public async updatePerson(person: Person): Promise<void> {
        await this.database.findByIdAndUpdate<Person>(
            PersonModel,
            person._id as string,
            person
        );
    }

    public async getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]> {
        const user = await this.getPerson(filters);
        if (!user) {
            return [];
        }
        const familyMembers = await this.database.find<Person>(PersonModel, {
            model: { familyId: user.familyId as String },
        });
        return familyMembers;
    }

    public async getPerson(filters: {
        name: string;
        surname: string;
    }): Promise<Person> {
        return (
            await this.database.find<Person>(PersonModel, {
                model: {
                    name: filters.name.trim(),
                    surname: filters.surname.trim(),
                },
                isLike: true,
            })
        )[0];
    }
    public async updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
            hasAcceptedTownHallInvitation: boolean;
        }[]
    ): Promise<void> {
        familyMembers.forEach(async (familyMember) => {
            await this.database.findByIdAndUpdate<Person>(
                PersonModel,
                familyMember.personId,
                {
                    hasAcceptedMealInvitation:
                        familyMember.hasAcceptedMealInvitation,
                    hasAcceptedReceptionInvitation:
                        familyMember.hasAcceptedReceptionInvitation,
                    hasAcceptedTownHallInvitation:
                        familyMember.hasAcceptedTownHallInvitation,
                }
            );
        });
    }

    public async deletePerson(personId: string): Promise<void> {
        await this.database.findByIdAndDelete(PersonModel, personId);
    }
}
