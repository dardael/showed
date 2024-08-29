import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import RichTextEditorData from 'showed/components/admin/page/component/richTextEditorData';
import CountdownData from 'showed/components/admin/page/component/coutdownData';

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
            {component.componentType === ComponentType.RICH_TEXT_EDITOR && (
                <RichTextEditorData component={component} />
            )}
            {component.componentType === ComponentType.COUNTDOWN && (
                <CountdownData component={component} />
            )}
        </SaveForm>
    );
}
