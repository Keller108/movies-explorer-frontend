import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <section className="techs" id="techs">
            <div className="techs__content-wrapper">
                <h2 className="section-subtitle">
                    Технологии
                </h2>
                <div className="techs__content">
                    <p className="section-title section-title_mb_25">
                        7 технологий
                    </p>
                    <p className="section-text section-text_limited">
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                    <ul className="techs__skills-list">
                        <li className="techs__skills-item">
                            HTML
                        </li>
                        <li className="techs__skills-item">
                            CSS
                        </li>
                        <li className="techs__skills-item">
                            JS
                        </li>
                        <li className="techs__skills-item">
                            React
                        </li>
                        <li className="techs__skills-item">
                            Git
                        </li>
                        <li className="techs__skills-item">
                            Express.js
                        </li>
                        <li className="techs__skills-item">
                            mongoDB
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
};

export default Techs;