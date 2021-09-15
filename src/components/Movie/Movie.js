import React from 'react';
import './Movie.css';
import LikeBtn from '../LikeBtn/LikeBtn';

function Movie ({card}) {

    const durationMovie = `${Math.trunc(card.duration / 60)}ч ${card.duration % 60}м`;

    return (
        <li className="movies-card-item">
            <a target="_blank" href={card.trailerLink} rel="noreferrer">
                <img className="movies-card-item__img" alt={`Стоп-кадр из фильма ${card.nameRU}`} src={`https://api.nomoreparties.co${card.image.url}`}/>
            </a>
            <div className="movies-card-item__title-wrapper">
                <p className="movies-card-item__title">
                    {card.nameRU}
                </p>
                <LikeBtn />
            </div>
            <p className="movies-card-item__duration">
                {durationMovie}
            </p>
        </li>
    )
};

export default Movie;