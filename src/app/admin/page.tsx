'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MaintainerData from 'showed/components/admin/maintainerData';
import FooterData from 'showed/components/admin/footerData';
import PagesTree from 'showed/components/admin/page/pagesTree';
import Appearance from 'showed/components/admin/appearance';
import LoginForm from 'showed/components/core/form/loginForm';
import { useState } from 'react';
import EmailAdmin from 'showed/components/admin/emailAdmin';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return isLoggedIn ? (
        <Box padding={'40px'}>
            <Tabs>
                <TabList>
                    <Tab>Utilisateur</Tab>
                    <Tab>Apparence</Tab>
                    <Tab>Bas de page</Tab>
                    <Tab>Pages</Tab>
                    <Tab>Emails</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <MaintainerData></MaintainerData>
                    </TabPanel>
                    <TabPanel>
                        <Appearance></Appearance>
                    </TabPanel>
                    <TabPanel>
                        <FooterData></FooterData>
                    </TabPanel>
                    <TabPanel>
                        <PagesTree></PagesTree>
                    </TabPanel>
                    <TabPanel>
                        <EmailAdmin></EmailAdmin>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    ) : (
        <LoginForm onLogin={handleLoginSuccess} />
    );
}
