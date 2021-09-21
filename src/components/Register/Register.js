import React from 'react';
import FormSection from '../FormSection/FormSection';
import { useFormValidation } from '../../hooks/useFormValidation';

function Register({ onRegister, registerText, setRegisterText, clearingErrors }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
    
    function handleChangeInput(e) {
        handleChange(e);
        if (registerText.length > 0) {
            setRegisterText('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ email: values.email, name: values.name, password: values.password });
        resetForm();
    };

    function onClearingErrors() {
        resetForm();
        clearingErrors();
    }

    return (
        <FormSection
            titleText='Добро пожаловать!'
            linkText='Уже зарегистрированы? '
            linkPath={'/signin'}
            linkTitle='Войти'
            onClearingErrors={onClearingErrors}
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
                            value={values.name || ''}
                            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                            onChange={handleChangeInput}
                            type="text"
                            minLength="2"   
                            maxLength="30"
                            required
                        />
                        <span className="form__error">
                            {errors.name}
                        </span>
                    </label>
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
                            value={values.password || ''}
                            type="password"
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
                    {registerText}
                </span>
                <button
                    className={isValid ? `form__submit-btn` : `form__submit-btn form__submit-btn_disabled`} 
                    disabled={!isValid} 
                    type="submit"
                >
                    Зарегистрироваться
                </button>
            </form>
        </FormSection>
    )
};

export default Register;