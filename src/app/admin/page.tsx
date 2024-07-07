'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MaintainerData from 'showed/components/admin/maintainerData';
import FooterData from 'showed/components/admin/footerData';
import PagesData from 'showed/components/admin/pagesData';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs colorScheme='black'>
                <TabList>
                    <Tab>Utilisateur</Tab>
                    <Tab>Bas de page</Tab>
                    <Tab>Pages</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <MaintainerData></MaintainerData>
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
