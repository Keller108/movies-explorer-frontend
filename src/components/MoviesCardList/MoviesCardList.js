import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie';

function MoviesCardList({cards, savedCards, isLoading, isSaved, isNotFound, saveMovieToBundle, deleteMovieFromBundle, isServerError}) {

    return (
        <section className="movies-card-section">
            <Preloader 
                isLoading={isLoading}
            />
            <p className={isNotFound ? `movies-card-section__text-not-found` : `movies-card-section__text-not-found movies-card-section__text-not-found_hidden`}>
                По вашему запросу ничего не найдено.
            </p>
            <p className='movies-card-section__text-server-error'>
                {isServerError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : ''}
            </p>
            <ul className="movies-card-list">
                {cards.map((card) => ( 
                    <Movie 
                        card={card}
                        savedCards={savedCards}
                        key={isSaved ? card.movieId : card.id}
                        isSaved={isSaved}
                        saveMovieToBundle={saveMovieToBundle}
                        deleteMovieFromBundle={deleteMovieFromBundle}
                    />     
                ))}
            </ul>
        </section>   
    )
};

export default MoviesCardList;