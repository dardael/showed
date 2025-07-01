import React from 'react';
import LoginForm from './loginForm';

export default {
    title: 'components/core/form/loginForm',
    component: LoginForm,
};

export const Default = () => (
    <LoginForm
        onLogin={async () => {
            alert('Logged in!');
        }}
    />
);
