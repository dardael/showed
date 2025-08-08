import SaveForm from './saveForm';
import { Box } from '@chakra-ui/react';
import EmailInput from './inputs/emailInput';
import PasswordInput from './inputs/passwordInput';
import { generateFingerprint } from 'showed/lib/frontend/core/authentification';

import {
    isAlreadyAuthentified,
    login,
} from 'showed/controllers/authentification/loginController';

import { useState, useEffect } from 'react';
import Loading from '../feedback/loading';

export default function LoginForm({ onLogin }: { onLogin: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        (async () => {
            const token = await generateFingerprint();
            const isConnected = await isAlreadyAuthentified(token);
            setIsConnected(isConnected);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return <Loading isLoading={true}>Chargement...</Loading>;
    }

    if (isConnected) {
        onLogin();
        return null;
    }

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
                hideBorder
                action={async (data: FormData) => {
                    const email = data.get('email') as string;
                    const password = data.get('password') as string;
                    const encodedPassword = encodePassword(password);
                    await login({
                        email,
                        password: encodedPassword,
                        token: await generateFingerprint(),
                    });
                    onLogin();
                }}
                validateButtonLabel='Se connecter'
                notificationLabels={{
                    success: 'Connexion réussie',
                    error: 'Erreur de connexion',
                    loading: 'Connexion en cours',
                }}
            >
                <EmailInput
                    label='Email'
                    name='email'
                    isRequired
                    aria-label='email'
                />
                <PasswordInput
                    label='Mot de passe'
                    name='password'
                    isRequired
                />
            </SaveForm>
        </Box>
    );
}
