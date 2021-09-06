import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {

    const user = {
        name : `Никита`,
        email : `keller108@mail.ru`,
    } 
    
    return (    
        <>
            <Header />
            <section className="profile">
                <form className="profile__form">
                    <h1 className="profile__title">
                        Привет, Никита!
                    </h1>
                    <div className="profile__inputs-wrapper">
                        <div className="profile__label-wrapper"> 
                            <label className="profile__label" for="profile-name">
                                Имя
                            </label>
                            <input className="profile__input" id="profile-name" placeholder="Ваше имя" defaultValue={user.name} maxlength="30" minlength="2"/>
                        </div>
                        <div className="profile__border-line"></div>
                        <div className="profile__label-wrapper"> 
                            <label className="profile__label" for="profile-email"> 
                                Почта
                            </label>
                            <input className="profile__input" id="profile-email" type="email" placeholder="Ваш е-mail" defaultValue={user.email} maxlength="30" minlength="8"/>
                        </div>    
                    </div>
                    <ul className="profile__action-container">
                        <li className="profile__action-item">
                            <button className="profile__action-btn transparent-link" type="submit">Редактировать</button>
                        </li>
                        <li className="profile__action-item">
                            <button className="profile__action-btn profile__action-btn_type_signout transparent-link" type="button">Выйти из аккаунта</button>
                        </li>
                    </ul>
                </form>
            </section>
        </>
    )
};

export default Profile;