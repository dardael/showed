import RichTextInput from 'showed/components/core/form/inputs/richTextInput';
import TextAreaInput from 'showed/components/core/form/inputs/textAreaInput';
import { Component } from 'showed/lib/page/models/component';

export default function HeaderWithColoredBackgroundData({
    component,
}: {
    component: Component;
}) {
    return (
        <>
            <RichTextInput
                isRequired
                name='content'
                label='Texte'
                defaultValue={component.content}
            />
        </>
    );
}
