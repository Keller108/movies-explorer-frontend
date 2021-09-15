import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie';

function MoviesCardList({cards}) {
    return (
        <section className="movies-card-section">
            <Preloader />
            <p className="movies-card-section__text-not-found movies-card-section__text-not-found_hidden">
                По вашему запросу ничего не найдено.
            </p>
            <ul className="movies-card-list">
                {cards.map((card) => ( 
                    <Movie 
                        card={card}
                        key={card.id}
                    />     
                ))}
            </ul>
            <button className="movies-card-item__more-btn">
                Ещё
            </button>
        </section>   
    )
};

export default MoviesCardList;