import FontSelect from 'showed/components/core/font/fontSelect';
import RichTextInput from 'showed/components/core/form/inputs/richTextInput';
import { Component } from 'showed/lib/page/models/component';

export default function HeaderWithColoredBackgroundData({
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
            <RichTextInput
                isRequired
                name='content'
                label='Texte'
                defaultValue={component.content}
            />
        </>
    );
}
