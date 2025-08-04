'use client';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import LoginForm from 'showed/components/core/form/loginForm';
import OrderAdminMenuBar from 'showed/components/menu/orderAdminMenuBar';
import NewOrders from 'showed/components/order/newOrders';
import ValidatedOrders from 'showed/components/order/validatedOrders';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return isLoggedIn ? (
        <>
            <OrderAdminMenuBar />
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
        </>
    ) : (
        <LoginForm onLogin={handleLoginSuccess} />
    );
}
