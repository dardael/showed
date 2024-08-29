import RichTextInput from 'showed/components/core/form/inputs/richTextInput';
import { Component } from 'showed/lib/page/models/component';

export default function RichTextEditorData({
    component,
}: {
    component: Component;
}) {
    return (
        <>
            <RichTextInput
                isRequired
                name='content'
                label='Contenu'
                defaultValue={component.content}
            />
        </>
    );
}
