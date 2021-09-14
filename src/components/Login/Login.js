import React, { useState } from 'react';
import FormSection from '../FormSection/FormSection';
import '../Form/Form.css';

function Login({ onLogin }) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChanglePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password})

    }
    
    return (
        <FormSection
            titleText='Рады видеть!'
            linkText='Ещё не зарегистрированы? '
            linkPath={'/signup'}
            linkTitle='Регистрация'
        >
        <form className="form" name="login-form" onSubmit={handleSubmit}>
                <ul className="form__inputs-wrapper">
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
                    Войти
                </button>
            </form>
    </FormSection>
    )
};

export default Login;