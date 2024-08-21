import RichTextInput from 'showed/components/core/form/inputs/richTextInput';
import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import { Component } from 'showed/lib/page/models/component';

export default function ComponentData({
    component,
    onSave,
}: {
    component: Component;
    onSave: (data: FormData) => Promise<Component>;
}) {
    return (
        <SaveForm
            parameters={[
                { key: 'id', value: component._id },
                { key: 'position', value: component.position },
            ]}
            action={onSave}
        >
            <TextInput
                isRequired
                name='title'
                label='Titre'
                placeholder='Titre'
                defaultValue={component.title}
            />
            <RichTextInput
                isRequired
                name='content'
                label='Contenu'
                defaultValue={component.content}
            />
        </SaveForm>
    );
}
