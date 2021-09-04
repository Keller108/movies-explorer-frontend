import React from 'react';
import './BurgerMenu.css';

function BurgerMenu({isLoggedIn, onOpenMenu}) {
    return (
        <button 
            className={isLoggedIn? `burger-menu burger-menu_visible` : `burger-menu`}
            type="button" 
            aria-label="burger-menu"
            onClick={onOpenMenu}
        />
    )
};

export default BurgerMenu;
