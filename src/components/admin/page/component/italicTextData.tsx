import FontSelect from 'showed/components/core/font/fontSelect';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { Component } from 'showed/lib/page/models/component';

export default function ItalicTextData({
    component,
}: {
    component: Component;
}) {
    return (
        <>
            <FontSelect
                name='font'
                label='Police'
                defaultValue={component.font?.toString()}
            />{' '}
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
