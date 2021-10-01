import React from 'react';
import './BurgerMenu.css';

function BurgerMenu({onOpenMenu}) {
    return (
        <button 
            className='burger-menu burger-menu_visible'
            type="button" 
            aria-label="burger-menu"
            onClick={onOpenMenu}
        />
    )
};

export default BurgerMenu;
