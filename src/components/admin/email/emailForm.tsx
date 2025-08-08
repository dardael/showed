import React from 'react';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import TextAreaInput from 'showed/components/core/form/inputs/textAreaInput';

const EmailForm = ({
    label,
    defaultSubject,
    defaultBody,
    onSend,
    emailKey,
}: {
    label: string;
    emailKey: string;
    defaultSubject?: string;
    defaultBody?: string;
    onSend: (formData: FormData) => Promise<void>;
}) => {
    return (
        <SaveForm
            action={onSend}
            header={label}
            parameters={[{ key: 'key', value: emailKey }]}
        >
            <TextInput
                label='Objet du mail'
                name='subject'
                placeholder='Objet du mail'
                isRequired
                defaultValue={defaultSubject || ''}
            />

            <TextAreaInput
                label='Corps du mail'
                name='body'
                defaultValue={defaultBody || ''}
                placeholder='Corps du mail'
                rows={6}
                isRequired
            />
        </SaveForm>
    );
};

export default EmailForm;
