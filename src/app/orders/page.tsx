'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import NewOrders from 'showed/components/order/newOrders';
import ValidatedOrders from 'showed/components/order/validatedOrders';

export default function Home() {
    return (
        <Box padding={'40px'}>
            <Tabs>
                <TabList>
                    <Tab>{'Nouvelles commandes'}</Tab>
                    <Tab>{'Commandes à réceptionner'}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <NewOrders />
                    </TabPanel>
                    <TabPanel>
                        <ValidatedOrders />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
