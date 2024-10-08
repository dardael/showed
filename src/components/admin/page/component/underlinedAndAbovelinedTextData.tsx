import TextInput from 'showed/components/core/form/inputs/textInput';
import { Component } from 'showed/lib/page/models/component';

export default function UnderlineAndAbovelineTextData({
    component,
}: {
    component: Component;
}) {
    return (
        <>
            <TextInput
                isRequired
                name='content'
                label='Text'
                placeholder='Texte à afficher'
                defaultValue={component.content}
            />
        </>
    );
}
