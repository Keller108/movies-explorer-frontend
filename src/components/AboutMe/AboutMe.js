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
                                После обучения в Яндекс.Практикуме я продолжаю совершенствовать свои навыки в стеке MERN (MongoDB, Express.js, React.js, Node.js). Так же изучаю новые веб-технологии: Redux, Redux-Saga, TypeScript. На данный момент нахожусь в поиске работы в продуктовой компании на позицию Junior Frontend Developer (предпочтительнее) или Fullstack MERN developer.
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