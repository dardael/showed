'use client';
import { useState } from 'react';
import Products from 'showed/components/admin/products/products';
import LoginForm from 'showed/components/core/form/loginForm';
import OrderAdminMenuBar from 'showed/components/menu/orderAdminMenuBar';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return isLoggedIn ? (
        <>
            <OrderAdminMenuBar />
            <Products />
        </>
    ) : (
        <LoginForm onLogin={handleLoginSuccess} />
    );
}
