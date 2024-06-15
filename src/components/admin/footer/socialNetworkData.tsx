import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';

export default function SocialNetworkData() {
    return (
        <SaveForm>
            <TextInput
                label='Texte affiché'
                name='text'
                placeholder='Texte affiché'
            />
            <TextInput label='Lien' name='target' placeholder='Lien' />
        </SaveForm>
    );
}
