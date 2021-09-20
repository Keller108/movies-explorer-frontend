import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie';

function MoviesCardList({cards, savedCards, isLoading, isSaved, isNotFound, saveMovieToBundle, deleteMovieFromBundle, isBtnDisabled}) {
    return (
        <section className="movies-card-section">
            <Preloader 
                isLoading={isLoading}
            />
            <p className={isNotFound ? `movies-card-section__text-not-found` : `movies-card-section__text-not-found movies-card-section__text-not-found_hidden`}>
                По вашему запросу ничего не найдено.
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
            <button className={isBtnDisabled ? `movies-card-item__more-btn movies-card-item__more-btn_disabled` : `movies-card-item__more-btn`}>
                Ещё
            </button>
        </section>   
    )
};

export default MoviesCardList;