import React from 'react';
import './Movie.css';
import LikeBtn from '../LikeBtn/LikeBtn';

function Movie ({imagePath, cardTitle, duration}) {

    return (
        <li className="movies-card-item">
            <img className="movies-card-item__img" alt='Стоп-кадр из фильма {cardTitle}' src={imagePath}/>
            <div className="movies-card-item__title-wrapper">
                <p className="movies-card-item__title">
                    {cardTitle}
                </p>
                <LikeBtn />
            </div>
            <p className="movies-card-item__duration">
                {duration}
            </p>
        </li>
    )
};

export default Movie;