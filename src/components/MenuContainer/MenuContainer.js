import React from 'react';
import './MenuContainer.css';
import AccountBtn from '../AccountBtn/AccountBtn';
import { Link } from 'react-router-dom';

function MenuContainer({isOpen, handleClose, isMain, isMovies, isSavedMovies}) {


    return (
        <div className={isOpen ? `menu-container menu-container_visible` : `menu-container`}>
            <div className="menu">
                <button
                    className="menu__close-btn" 
                    onClick={handleClose}
                />
                <ul className="menu__links">
                    <li className="menu__link">
                        <Link className={isMain ? `menu__link-item menu__link-item_active transparent-link`: `menu__link-item transparent-link`} to="/">Главная</Link>
                    </li>
                    <li className="menu__link">
                        <Link className={isMovies ? `menu__link-item menu__link-item_active transparent-link`: `menu__link-item transparent-link`} to="/movies">Фильмы</Link>
                    </li>
                    <li className="menu__link">
                        <Link className={isSavedMovies ? `menu__link-item menu__link-item_active transparent-link`: `menu__link-item transparent-link`} to="/saved-movies">Сохраненные фильмы</Link>
                    </li>
                </ul>
                <AccountBtn />
            </div>
        </div>
    )
};

export default MenuContainer;