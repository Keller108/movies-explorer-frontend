import React from 'react';
import {useState} from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import MenuContainer from '../MenuContainer/MenuContainer';
import AccountContainer from '../AccountContainer/AccountContainer';
import AuthContainer from '../AuthContainer/AuthContainer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({loggedIn, isMainActive, isMoviesActive, isSavedMoviesActive}) {

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    function handleMenuOpen() {
      setIsMenuOpened(!isMenuOpened)
    };

    return (
        <>
            {loggedIn ? (
                <>
                    <header className="header">
                        <div className="header__container">
                            <Logo />
                            <AccountContainer
                                isOpen={loggedIn}
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
            ) : (
                <header className="header">
                    <div className="header__container">
                        <Logo />
                        <AuthContainer 
                        />
                    </div>
                </header>
                )
            }
        </>    
    )
}

export default Header;
