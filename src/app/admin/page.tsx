import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MaintainerData from 'showed/components/admin/maintainerData';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs>
                <TabList>
                    <Tab>Utilisateur</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <MaintainerData></MaintainerData>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
