'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MaintainerData from 'showed/components/admin/maintainerData';
import FooterData from 'showed/components/admin/footerData';
import PagesData from 'showed/components/admin/pagesData';
import Appearance from 'showed/components/admin/appearance';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs>
                <TabList>
                    <Tab>Utilisateur</Tab>
                    <Tab>Apparence</Tab>
                    <Tab>Bas de page</Tab>
                    <Tab>Pages</Tab>
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
                        <PagesData></PagesData>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
