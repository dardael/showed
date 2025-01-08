import mongoose, { Model } from 'mongoose';
import { LifeStage } from './lifeStage';
type Person = {
    _id?: string;
    familyId?: string;
    name?: string;
    surname?: string;
    lifeStage?: LifeStage;
    isInvitedToMeal?: boolean;
    hasAcceptedMealInvitation?: boolean;
    isInvitedToReception?: boolean;
    hasAcceptedReceptionInvitation?: boolean;
    isInvitedToTownHall?: boolean;
    hasAcceptedTownHallInvitation?: boolean;
};
const PersonSchema = new mongoose.Schema({
    _id: { type: String, require: true, unique: true },
    familyId: { type: String },
    name: { type: String },
    surname: { type: String },
    lifeStage: { type: String },
    isInvitedToMeal: { type: Boolean },
    isInvitedToReception: { type: Boolean },
    hasAcceptedMealInvitation: { type: Boolean },
    hasAcceptedReceptionInvitation: { type: Boolean },
    isInvitedToTownHall: { type: Boolean },
    hasAcceptedTownHallInvitation: { type: Boolean },
});

let PersonModel: Model<Person> = mongoose?.models?.Person;
if (!PersonModel) {
    PersonModel = mongoose.model<Person>('Person', PersonSchema);
}

export { PersonModel };
export type { Person };
