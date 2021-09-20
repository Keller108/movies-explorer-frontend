import React, { useState, useContext, useEffect } from 'react';
import './Movie.css';
import LikeBtn from '../LikeBtn/LikeBtn';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movie ({card, isSaved, savedCards, saveMovieToBundle, deleteMovieFromBundle}) {

    const [isLike, setIsLike] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const savingMovie = savedCards.find((item) => item.nameRU === card.nameRU && item.owner === currentUser._id);

    const movie = {
        country: card.country || 'Нет',
        director: card.director || 'Нет',    
        duration: card.duration || 0,
        year: card.year || 'Нет',
        description: card.description || 'Нет',
        image: isSaved ? card.image.url : `https://api.nomoreparties.co${card.image.url}`,
        trailer: isSaved ? card.trailer : card.trailerLink,
        thumbnail: isSaved ? card.thumbnail : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: isSaved ? card._id : card.id,
        nameRU: card.nameRU || 'Нет',
        nameEN: card.nameEN || 'Нет',
    };

    function handleLikeMovie(e) {
        if (isLike) {
            const moviesForSearch = savedCards.find((item) => item.movieId === card.id);
            deleteMovieFromBundle(moviesForSearch._id);
            console.log(moviesForSearch)
        }
        else {
            saveMovieToBundle(movie);
        }
        setIsLike(!isLike);
    }

    function handleDeleteMovie(e) {
        deleteMovieFromBundle(card._id);
    }

    useEffect(() => {
        if (savingMovie) {
            setIsLike(true);
        }
    }, [savingMovie]);

    const durationMovie = `${Math.trunc(card.duration / 60)}ч ${card.duration % 60}м`;

    return (
        <li className="movies-card-item" id={isSaved ? card._id : card.id}>
            <a className="movies-card-item__link" target="_blank" href={isSaved ? card.trailer : card.trailerLink} rel="noreferrer">
                <img className="movies-card-item__img" alt={`Стоп-кадр из фильма ${card.nameRU}`} src={isSaved ? card.image : `https://api.nomoreparties.co${card.image.url}`}/>
            </a>
            <div className="movies-card-item__title-wrapper">
                <p className="movies-card-item__title">
                    {card.nameRU}
                </p>
                <LikeBtn 
                    isLike={isLike}
                    onMovieLike={isSaved ? handleDeleteMovie : handleLikeMovie}
                />
            </div>
            <p className="movies-card-item__duration">
                {durationMovie}
            </p>
        </li>
    )
};

export default Movie;