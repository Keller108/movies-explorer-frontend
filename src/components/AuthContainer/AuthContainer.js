import React from 'react';
import './AuthContainer.css';
import { Link } from 'react-router-dom';

function AuthContainer() {

    return (
        <ul className="header__auth-container">
            <li>
                <Link className="header__auth-link transparent-link" to="/signup">
                    Регистрация
                </Link>
            </li>
            <li>
                <Link className="header__auth-link header__auth-link_type_signin transparent-link" to="/signin">
                    Войти
                </Link>
            </li>
                    {/* <button 
                        className="header__auth-link header__auth-link_type_signin transparent-link" 
                        onClick={(e) => {onLoggin(); onLoginMenu()}}
                    >
                        Войти
                    </button> */}
        </ul>
    )
};

export default AuthContainer;