import React from 'react';
import {useState} from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import MenuContainer from '../MenuContainer/MenuContainer';
import AccountContainer from '../AccountContainer/AccountContainer';
import AuthContainer from '../AuthContainer/AuthContainer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({isMainActive, isMoviesActive, isSavedMoviesActive}) {
    const [isLogin, setIsLogin] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    function handleLogin () {
        setIsLogin(!isLogin)
      }
    function handleMenuOpen() {
      setIsMenuOpened(!isMenuOpened)
    };

    return (
        <>
            <header className="header">
                <div className="header__container">
                    <Logo />
                    <AuthContainer 
                        onLoggin={handleLogin}
                        isOpen={isLogin}
                    />
                    <AccountContainer
                        isOpen={isLogin}
                    />
                    <BurgerMenu 
                        onOpenMenu={handleMenuOpen}
                    />
                </div>
            </header>
            <MenuContainer 
                isOpen={isMenuOpened}
                isMain={isMainActive}
                isMovies={isMoviesActive}
                isSavedMovies={isSavedMoviesActive}
                handleClose={handleMenuOpen}
            />
        </>
    )
};

export default Header;
