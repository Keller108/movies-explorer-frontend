import React from 'react';
import FormSection from '../FormSection/FormSection';
import '../Form/Form.css';
import { useFormValidation } from '../../hooks/useFormValidation';

function Login({ onLogin }) {
    
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
    
    function handleChangeInput(e) {
        handleChange(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email: values.email, password: values.password });
        resetForm();
    };

    function handleClearErrors() {
        resetForm();
    };
    
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
                            value={values.email || ''}
                            onChange={handleChangeInput}
                            type="email"
                            minLength="8"
                            maxLength="30"
                            required
                        />
                        <span className="form__error">
                            {errors.email}
                        </span>
                    </label>
                    <label className="form__label" htmlFor="form-password">
                        Пароль
                        <input
                            className="form__input"
                            id="form-password"
                            name="password"
                            placeholder="Ваш пароль"
                            type="password"
                            value={values.password || ''}
                            minLength="8"
                            onChange={handleChangeInput}
                            required
                        />
                        <span className="form__error">
                            {errors.password}
                        </span>
                    </label>
                </ul>
                <button 
                    className={isValid ? `form__submit-btn` : `form__submit-btn form__submit-btn_disabled`} 
                    disabled={!isValid} 
                    type="submit"
                >
                    Войти
                </button>
            </form>
    </FormSection>
    )
};

export default Login;