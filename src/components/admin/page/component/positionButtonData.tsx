import TextInput from 'showed/components/core/form/inputs/textInput';
import { Component } from 'showed/lib/page/models/component';

export default function positionButtonData({
    component,
}: {
    component: Component;
}) {
    return (
        <>
            <TextInput
                isRequired
                name='content'
                label='Texte'
                placeholder='Texte à afficher'
                defaultValue={component.content}
            />
            <TextInput
                isRequired
                name='link'
                label='Lien'
                placeholder='Lien du nouvel onglet à afficher'
                defaultValue={component.link}
            />
        </>
    );
}
