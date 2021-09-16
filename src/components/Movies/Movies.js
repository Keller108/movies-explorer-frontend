import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({loggedIn, cards, isFilteredCards, onMoviesSearch, isLoading, setFilter}) {

    function filterChange() {
        setFilter();
    }

    return (
        <>
            <Header 
                isMainActive={true}
                isSavedMoviesActive={false}
                isMoviesActive={false}
                loggedIn={loggedIn}
            />
            <SearchForm
                onMoviesSearch={onMoviesSearch}
                isFilteredCards={isFilteredCards}
                onFilterChange={filterChange}
            />
            <MoviesCardList 
                cards={cards}
                isLoading={isLoading}
            />
            <Footer />
        </>
    )
};

export default Movies;