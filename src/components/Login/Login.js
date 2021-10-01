import React from 'react';
import FormSection from '../FormSection/FormSection';
import '../Form/Form.css';
import { useFormValidation } from '../../hooks/useFormValidation';

function Login({ onLogin, loginText, setLoginText, clearingErrors}) {
    
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
    
    function handleChangeInput(e) {
        handleChange(e);
        if (loginText.length > 0) {
            setLoginText('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email: values.email, password: values.password });
        resetForm();
    };

    function onClearingErrors() {
        resetForm();
        clearingErrors();
    };
    
    return (
        <FormSection
            titleText='Рады видеть!'
            linkText='Ещё не зарегистрированы? '
            linkPath={'/signup'}
            linkTitle='Регистрация'
            onClearingErrors={onClearingErrors}
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
                <span className="form__response-text-error form__response-text-error_place_register">
                    {loginText}
                </span>
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