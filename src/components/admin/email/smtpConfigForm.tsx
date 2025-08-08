import React from 'react';
import SaveForm from '../../core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import NumberInput from 'showed/components/core/form/inputs/numberInput';
import PasswordInput from 'showed/components/core/form/inputs/passwordInput';
import EmailInput from 'showed/components/core/form/inputs/emailInput';

const SmtpConfigForm = ({
    onSave,
    initialConfiguration,
}: {
    onSave: (formData: FormData) => Promise<void>;
    initialConfiguration?: {
        host: string | null;
        port: number;
        user: string | null;
        password: string | null;
        from: string | null;
    };
}) => {
    return (
        <SaveForm action={onSave} header='Configuration SMTP'>
            <TextInput
                label='Hote'
                isRequired
                defaultValue={initialConfiguration?.host || ''}
                name='host'
                placeholder='smtp.gmail.com'
            />
            <NumberInput
                label='Port'
                isRequired
                defaultValue={initialConfiguration?.port || 465}
                name='port'
                placeholder='465'
            />
            <TextInput
                label='Utilisateur'
                isRequired
                defaultValue={initialConfiguration?.user || ''}
                name='user'
            />
            <PasswordInput
                label='Mot de passe'
                isRequired
                defaultValue={initialConfiguration?.password || ''}
                name='password'
            />
            <EmailInput
                label='Mail'
                isRequired
                defaultValue={initialConfiguration?.from || ''}
                name='from'
            />
        </SaveForm>
    );
};

export default SmtpConfigForm;
