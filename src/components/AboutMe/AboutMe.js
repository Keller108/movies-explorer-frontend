import React from 'react';
import './AboutMe.css';
import profilePath from '../../images/profile-image.jpg';

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <div className="about-me__content-wrapper">
                <h2 className="section-subtitle">
                    Студент
                </h2>
                <div className="about-me__content">
                    <div className="about-me__text-wrapper">
                        <div className="about-me__text-content">
                            <h3 className="section-title section-title_mb_25">
                                Никита
                            </h3>
                            <p className="about-me__subtitle">
                                Фронтенд-разработчик, 30 лет
                            </p>
                            <p className="section-text">
                                Живу в городе Магнитогорск, работаю индивидуальным предпринемателем. Предоставляю услуги по разработке и поддержке сайтов. Работаю преимущественно с клиентами из Москвы. После обучения из Яндекс.Практикума начал целиться на работу в большой команде фронтенд разработчиком. Вдохновляюсь веб-технологиями.
                            </p>
                        </div>
                        <ul className="about-me__links">
                            <li className="about-me__link-item transparent-link">
                                <a className="about-me__link" href="https://www.facebook.com/nick.keller.902" target="_self">Facebook</a>
                            </li>
                            <li className="about-me__link-item transparent-link">
                                <a className="about-me__link" href="https://github.com/keller108" target="_self">Github</a>
                            </li>
                        </ul>
                    </div>
                    <div className="about-me__image-wrapper">
                        <img className="about-me__image" src={profilePath} alt="На фото - Никита Исаев"/>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AboutMe;