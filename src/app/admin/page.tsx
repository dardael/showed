import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MaintainerData from 'showed/components/admin/maintainerData';
import FooterData from 'showed/components/admin/footerData';
import HomePageData from 'showed/components/admin/homePageData';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs colorScheme='black'>
                <TabList>
                    <Tab>Utilisateur</Tab>
                    <Tab>Bas de page</Tab>
                    <Tab>Page d&apos;accueil</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <MaintainerData></MaintainerData>
                    </TabPanel>
                    <TabPanel>
                        <FooterData></FooterData>
                    </TabPanel>
                    <TabPanel>
                        <HomePageData></HomePageData>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
