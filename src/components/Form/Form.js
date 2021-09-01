import React from 'react';
import './Form.css';

function Form ({user, formID, children, buttonText}) {
    return (
        <form className="form" id={formID}>
                <ul className="form__inputs-wrapper">
                    {children}
                    {/* <label className="register__label">
                        Имя
                        <input className="register__input" defaultValue={user.name} type="text" minlength="2" maxlength="30"/>
                    </label> */}
                    <label className="form__label" for="form-email">
                        E-mail
                        <input className="form__input" id="form-email" placeholder="Ваш e-mail" defaultValue={user.email} type="email" minlength="8" maxlength="30" required/>
                    </label>
                    <label className="form__label" for="form-password">
                        Пароль
                        <input className="form__input" id="form-password" placeholder="Ваш пароль" type="password" minlength="8" required/>
                    </label>
                </ul>
                <button className="form__submit-btn" type="submit">
                    {buttonText}
                </button>
            </form>
    )
};

export default Form;