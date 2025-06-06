'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import NewOrders from 'showed/components/order/newOrders';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs>
                <TabList>
                    <Tab>{'Nouvelles commandes'}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <NewOrders />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
