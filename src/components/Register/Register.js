import React from 'react';
import FormSection from '../FormSection/FormSection';
import Form from '../Form/Form';

function Register({user}) {

    return (
        <FormSection
            titleText='Добро пожаловать!'
            linkText='Уже зарегистрированы? '
            linkPath={'/signin'}
            linkTitle='Войти'
        >
            <Form
                buttonText='Зарегистрироваться'
                user={user}
            >
                <label className="form__label" for="form-name">
                    Имя
                    <input className="form__input" id="form-name" placeholder="Ваше имя" defaultValue={user.name} type="text" minlength="2" maxlength="30"/>
                </label>
            </Form>
        </FormSection>
    )
};

export default Register;