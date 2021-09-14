import React, { useState } from 'react';
import FormSection from '../FormSection/FormSection';

function Register({ onRegister }) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChanglePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({name, email, password})

    }

    return (
        <FormSection
            titleText='Добро пожаловать!'
            linkText='Уже зарегистрированы? '
            linkPath={'/signin'}
            linkTitle='Войти'
        >
            <form className="form" name="register-form" onSubmit={handleSubmit}>
                <ul className="form__inputs-wrapper">
                    <label className="form__label" htmlFor="form-name">
                        Имя
                        <input 
                            className="form__input"
                            id="form-name"
                            name="name"
                            placeholder="Ваше имя"
                            value={name || ''}
                            onChange={handleChangeName}
                            type="text"
                            minLength="2"   
                            maxLength="30"
                            required
                        />
                    </label>
                    <label className="form__label" htmlFor="form-email">
                        E-mail
                        <input
                            className="form__input"
                            id="form-email"
                            name="email"
                            placeholder="Ваш e-mail"
                            value={email || ''}
                            onChange={handleChangeEmail}
                            type="email"
                            minLength="8"
                            maxLength="30"
                            required
                        />
                    </label>
                    <label className="form__label" htmlFor="form-password">
                        Пароль
                        <input
                            className="form__input"
                            id="form-password"
                            name="password"
                            placeholder="Ваш пароль"
                            type="password"
                            minLength="8"
                            onChange={handleChanglePassword}
                            required
                        />
                    </label>
                </ul>
                <button className="form__submit-btn" type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </FormSection>
    )
};

export default Register;