import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="section-subtitle">
                О проекте
            </h2>
            <div className="about-project__content">
                <div className="about-project__text-wrapper">
                    <div className="about-project__text-col">
                        <p className="about-project__text-col-title">
                            Дипломный проект включал 5 этапов
                        </p>
                        <p className="section-text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>

                    </div>
                    <div className="about-project__text-col">
                        <p className="about-project__text-col-title">
                            На выполнение диплома ушло 5 недель
                        </p>
                        <p className="section-text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
                <div className="about-project__length">
                    <div className="about-project__length-backend">
                        <div className="about-project__length-item_backend about-project__length-backend-item_marked">
                            1 неделя
                        </div>
                        <div className="about-project__length-item_backend">
                            Back-end
                        </div>
                    </div>
                    <div className="about-project__length-frontend">
                        <div className="about-project__length-frontend-item about-project__length-frontend-item_marked">
                            4 недели
                        </div>
                        <div className="about-project__length-frontend-item">
                            Front-end
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;