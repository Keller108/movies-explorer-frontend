import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import cardImage1 from '../../images/movies-card__item_1.jpg';
import cardImage2 from '../../images/movies-card__item_2.jpg';
import cardImage3 from '../../images/movies-card__item_3.jpg';
import cardImage4 from '../../images/movies-card__item_4.jpg';
import cardImage5 from '../../images/movies-card__item_5.jpg';
import cardImage6 from '../../images/movies-card__item_6.jpg';
import cardImage7 from '../../images/movies-card__item_7.jpg';
import cardImage8 from '../../images/movies-card__item_8.jpg';
import cardImage9 from '../../images/movies-card__item_9.jpg';
import cardImage10 from '../../images/movies-card__item_10.jpg';
import cardImage11 from '../../images/movies-card__item_11.jpg';
import cardImage12 from '../../images/movies-card__item_12.jpg';
import Movie from '../Movie/Movie';

function MoviesCardList() {
    return (
        <section className="movies-card-section">
            <Preloader />
            <p className="movies-card-section__text-not-found movies-card-section__text-not-found_hidden">
                По вашему запросу ничего не найдено.
            </p>
            <ul className="movies-card-list">
                <Movie 
                    imagePath={cardImage1}
                    cardTitle='33 слова о дизайне'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage2}
                    cardTitle='Киноальманах «100 лет дизайна»'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage3}
                    cardTitle='В погоне за Бенкси'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage4}
                    cardTitle='Баския: Взрыв реальности'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage5}
                    cardTitle='Бег это свобода'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage6}
                    cardTitle='Книготорговцы'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage7}
                    cardTitle='Когда я думаю о Германии ночью'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage8}
                    cardTitle='Gimme Danger: История Игги и The Stooges'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage9}
                    cardTitle='Соберись перед прыжком'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage10}
                    cardTitle='Дженис: Маленькая девочка грустит'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage11}
                    cardTitle='Пи Джей Харви: A dog called money'
                    duration='1ч 42м'
                />
                <Movie 
                    imagePath={cardImage12}
                    cardTitle='Соберись перед прыжком'
                    duration='1ч 42м'
                />
            </ul>
            <button className="movies-card-item__more-btn">
                Ещё
            </button>
        </section>   
    )
};

export default MoviesCardList;