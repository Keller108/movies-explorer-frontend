import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile({loggedIn, onProfileChange, onLogout }) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser, loggedIn])
    
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onProfileChange({name, email})

    }

    return (    
        <>
            <Header 
                loggedIn={loggedIn}
            />
            <section className="profile">
                <form className="profile__form" name="profile-form" onSubmit={handleSubmit}>
                    <h1 className="profile__title">
                        Привет, Никита!
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
                                onChange={handleChangeName}
                                value={name || ''}
                                maxLength="30"
                                minLength="2"
                            />
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
                                onChange={handleChangeEmail}
                                value={email || ''}
                                placeholder="Ваш е-mail"
                                maxLength="30"
                                minLength="8"
                            />
                        </div>    
                    </div>
                    <ul className="profile__action-container">
                        <li className="profile__action-item">
                            <button className="profile__action-btn transparent-link" type="submit">Редактировать</button>
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