import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound () {
    const history = useHistory(); 
    return (
        <section className="not-found">
            <div className="not-found__title-wrapper">
                <h1 className="not-found__title">
                    404
                </h1>
                <p className="not-found__subtitle">
                    Страница не найдена
                </p>
            </div>
            <button className="not-found__link" onClick={history.goBack}>Назад</button>
        </section>
    )
};

export default NotFound;