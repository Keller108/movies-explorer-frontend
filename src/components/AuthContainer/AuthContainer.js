import React from 'react';
import './AuthContainer.css';
import { Link } from 'react-router-dom';

function AuthContainer({onLoggin, isOpen, onLoginMenu}) {

    return (
        <div className={isOpen ? `header__auth-container header__auth-container_invisible` : `header__auth-container`}>
                    <Link className="header__auth-link transparent-link" to="/signup">
                        Регистрация
                    </Link>
                    <button 
                        className="header__auth-link header__auth-link_type_signin transparent-link" 
                        onClick={(e) => {onLoggin(); onLoginMenu()}}
                    >
                        Войти
                    </button>
                </div>
    )
};

export default AuthContainer;