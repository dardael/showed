import React, { useEffect, useState } from 'react';
import { VStack, Divider } from '@chakra-ui/react';
import SMTPConfigForm from './email/smtpConfigForm';
import EmailForm from './email/emailForm';
import { EmailKey } from 'showed/lib/email/models/emailKey';
import type { Email } from 'showed/lib/email/models/email';
import {
    getEmail,
    saveEmail,
    saveSMTPConfig,
    getSMTPConfig,
} from 'showed/controllers/email/emailController';
import Loading from '../core/feedback/loading';

const EmailAdmin = () => {
    const [smtpConfig, setSmtpConfig] = useState<{
        host: string | null;
        port: number;
        user: string | null;
        password: string | null;
        from: string | null;
    } | null>(null);
    const [orderCreatedEmail, setOrderCreatedEmail] = useState<Email | null>(
        null
    );
    const [orderConfirmationEmail, setOrderConfirmationEmail] =
        useState<Email | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const smtpConfigData = await getSMTPConfig();
            const orderCreatedEmailData = await getEmail(
                EmailKey.NEW_ORDER_CREATED
            );
            const orderConfirmationEmailData = await getEmail(
                EmailKey.ORDER_CONFIRMATION
            );

            setSmtpConfig(smtpConfigData);
            setOrderCreatedEmail(orderCreatedEmailData);
            setOrderConfirmationEmail(orderConfirmationEmailData);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <Loading isLoading={isLoading}>
            <VStack spacing={8} align='stretch'>
                <SMTPConfigForm
                    onSave={saveSMTPConfig}
                    initialConfiguration={
                        smtpConfig || {
                            port: 465,
                            host: null,
                            user: null,
                            password: null,
                            from: null,
                        }
                    }
                />
                <Divider />
                <EmailForm
                    emailKey={EmailKey.NEW_ORDER_CREATED}
                    label="Mail d'information d'une nouvelle commande"
                    onSend={saveEmail}
                    defaultSubject={
                        orderCreatedEmail?.subject || 'Nouvelle commande reçue'
                    }
                    defaultBody={
                        orderCreatedEmail?.body ||
                        'Bonjour, une nouvelle commande vous a été faite.'
                    }
                />
                <Divider />
                <EmailForm
                    emailKey={EmailKey.ORDER_CONFIRMATION}
                    label='Mail de confirmation de la commande'
                    onSend={saveEmail}
                    defaultSubject={
                        orderConfirmationEmail?.subject ||
                        'Confirmation de votre commande'
                    }
                    defaultBody={
                        orderConfirmationEmail?.body ||
                        'Merci pour votre commande ! Votre achat est confirmé, nous vous contacterons dans les plus bref delais'
                    }
                />
            </VStack>
        </Loading>
    );
};

export default EmailAdmin;
