import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useEffect, useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { useFormValidation } from '../../hooks/useFormValidation';

function Profile({loggedIn, userData, onProfileChange, onLogout, profileText, setProfileText}) {

    const { values, handleChange, errors, isValid, resetForm, setValues } = useFormValidation();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);

    function handleChangeInput(e) {
        handleChange(e);
        if (profileText.length > 0) {
            setProfileText('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onProfileChange({ name: values.name, email: values.email});
        resetForm();
    };

    return (    
        <>
            <Header 
                loggedIn={loggedIn}
            />
            <section className="profile">
                <form className="profile__form" name="profile-form" onSubmit={handleSubmit}>
                    <h1 className="profile__title">
                        Привет, {userData.name}!
                    </h1>
                    <div className="profile__inputs-wrapper">
                        <div className="profile__label-wrapper">
                            <label className="profile__label" htmlFor="profile-name">
                                    Имя
                            </label>
                                <input
                                    className="profile__input"
                                    id="profile-name"   
                                    placeholder="Ваше имя"
                                    name="name"
                                    onChange={handleChangeInput}
                                    value={values.name || ''}
                                    pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                                    maxLength="30"
                                    minLength="2"
                                    type="text"
                                    required
                                />
                                <span className="profile__error">
                                    {errors.name}
                                </span>
                        </div>
                        <div className="profile__border-line"></div>
                        <div className="profile__label-wrapper"> 
                            <label 
                                className="profile__label"
                                htmlFor="profile-email"> 
                                Почта
                            </label>
                            <input
                                className="profile__input"
                                id="profile-email"
                                type="email"
                                name="email"
                                onChange={handleChangeInput}
                                value={values.email || ''}
                                placeholder="Ваш е-mail"
                                maxLength="30"
                                minLength="8"
                                required
                            />
                            <span className="profile__error">
                                {errors.email}
                            </span>
                        </div>    
                    </div>
                    <ul className="profile__action-container">
                        <span className="form__response-text-error">
                            {profileText}
                        </span>    
                        <li className="profile__action-item">
                            <button
                                className="profile__action-btn transparent-link"
                                disabled={!isValid}
                                type="submit"
                            >
                                Редактировать
                            </button>
                        </li>
                        <li className="profile__action-item">
                            <button
                                className="profile__action-btn profile__action-btn_type_signout transparent-link"
                                type="button" 
                                onClick={onLogout}
                            >Выйти из аккаунта</button>
                        </li>
                    </ul>
                </form>
            </section>
        </>
    )
};

export default Profile;