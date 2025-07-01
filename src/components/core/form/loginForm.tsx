import SaveForm from './saveForm';
import { Box } from '@chakra-ui/react';
import EmailInput from './inputs/emailInput';
import PasswordInput from './inputs/passwordInput';

import { loginController } from 'showed/controllers/authentification/loginController';

export default function LoginForm({ onLogin }: { onLogin: () => void }) {
    const encodePassword = (password: string): string => {
        return btoa(password); // Encode password to Base64
    };

    return (
        <Box
            position='fixed'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            padding='20px'
            background='white'
            borderRadius='8px'
            boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
            zIndex='1000'
        >
            <SaveForm
                action={async (data: FormData) => {
                    const email = data.get('email') as string;
                    const password = data.get('password') as string;
                    const encodedPassword = encodePassword(password);
                    const isValid = await loginController({
                        email,
                        password: encodedPassword,
                    });
                    if (isValid) {
                        onLogin();
                    }
                }}
                validateButtonLabel='Se connecter'
                notificationLabels={{
                    success: 'Connexion réussie',
                    error: 'Erreur de connexion',
                    loading: 'Connexion en cours',
                }}
            >
                <EmailInput label='Email' name='email' isRequired />
                <PasswordInput
                    label='Mot de passe'
                    name='password'
                    isRequired
                />
            </SaveForm>
        </Box>
    );
}
