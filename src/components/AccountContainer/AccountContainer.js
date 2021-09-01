import React from 'react';
import './AccountContainer.css';
import { Link } from 'react-router-dom';
import AccountBtn from '../AccountBtn/AccountBtn';

function AccountContainer({isOpen}) {
    return (
        <ul className={isOpen ? `header__account-container header__account-container_visible` : `header__account-container`}>
            <li className="header__account-container-item">
                <Link className="header__account-link transparent-link" to="/movies">Фильмы</Link>
            </li>
            <li className="header__account-container-item">
                <Link className="header__account-link transparent-link" to="/saved-movies">Сохраненные фильмы</Link>
             </li>
            <li className="header__account-container-item">
                <AccountBtn />
            </li>
        </ul>
    )
};

export default AccountContainer;