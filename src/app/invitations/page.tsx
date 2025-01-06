'use client';
import { Box } from '@chakra-ui/react';
import InvitationsList from 'showed/components/admin/invitations/invitationsList';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <InvitationsList />
        </Box>
    );
}
