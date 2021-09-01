import React from 'react';
import FormSection from '../FormSection/FormSection';
import Form from '../Form/Form';

function Login({user}) {
    
    return (
        <FormSection
            titleText='Рады видеть!'
            linkText='Ещё не зарегистрированы? '
            linkPath={'/signup'}
            linkTitle='Регистрация'
        >
        <Form
            buttonText='Войти'
            user={user}
        >
        </Form>
    </FormSection>
    )
};

export default Login;