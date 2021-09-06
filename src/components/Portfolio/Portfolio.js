import React from 'react';
import './Portfolio.css';

function Porfolio() {
    return (
        <section className="portfolio">
            <h2 className="posfolio__title">
                Портфолио
            </h2>
            <ul className="porfolio__links">
                <li className="porfolio__link">
                    <a className="porfolio__link-item transparent-link" href="https://keller108.github.io/how-to-learn/" target="_self">Статичный сайт</a>
                </li>
                <li className="porfolio__link">
                    <a className="porfolio__link-item transparent-link" href="https://keller108.github.io/russian-travel/" target="_self">Адаптивный сайт</a>
                </li>
                <li className="porfolio__link">
                    <a className="porfolio__link-item transparent-link" href="https://mesto108.nomoredomains.club/" target="_self">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    )
};

export default Porfolio;