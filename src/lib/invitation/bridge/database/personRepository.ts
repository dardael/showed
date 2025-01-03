import { PersonModel } from 'showed/lib/invitation/models/person';
import type { Person } from 'showed/lib/invitation/models/person';
import type Database from 'showed/lib/core/database/service/database';
import PersonRepositoryInterface from 'showed/lib/invitation/personRepository';

export default class PersonRepository implements PersonRepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async getFamilyMembers(filters: {
        name: string;
        surname: string;
    }): Promise<Person[]> {
        const user = await this.getPerson(filters);
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
                model: filters,
                isLike: true,
            })
        )[0];
    }
    public async updateFamilyMembers(
        familyMembers: {
            personId: string;
            hasAcceptedMealInvitation: boolean;
            hasAcceptedReceptionInvitation: boolean;
        }[]
    ): Promise<void> {
        familyMembers.forEach(async (familyMember) => {
            console.log(familyMember);
            await this.database.findByIdAndUpdate<Person>(
                PersonModel,
                familyMember.personId,
                {
                    hasAcceptedMealInvitation:
                        familyMember.hasAcceptedMealInvitation,
                    hasAcceptedReceptionInvitation:
                        familyMember.hasAcceptedReceptionInvitation,
                }
            );
        });
    }
}
