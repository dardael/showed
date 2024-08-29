import TextInput from 'showed/components/core/form/inputs/textInput';
import { Component } from 'showed/lib/page/models/component';

export default function HeaderData({ component }: { component: Component }) {
    return (
        <>
            <TextInput
                isRequired
                name='content'
                label='Texte'
                placeholder='Texte à afficher'
                defaultValue={component.content}
            />
        </>
    );
}
