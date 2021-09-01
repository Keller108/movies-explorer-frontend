import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top">
                <p className="footer__top-caption">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
            </div>
            <div className="footer__bottom">
                <p className="footer__copyright">
                    &copy; 2021
                </p>
                <ul className="footer__links">
                    <li className="footer__link-item">
                        <a className="footer__link transparent-link" href="https://praktikum.yandex.ru/" target="_self">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__link-item">
                        <a className="footer__link transparent-link" href="https://github.com/keller108" target="_self">
                            Github
                        </a>
                    </li>
                    <li className="footer__link-item">
                        <a className="footer__link transparent-link" href="https://www.facebook.com/nick.keller.902" target="_self">
                            Facebook
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
};

export default Footer;