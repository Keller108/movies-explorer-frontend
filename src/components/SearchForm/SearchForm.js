import React from 'react';
import './SearchForm.css';
import FilterBtn from '../FilterBtn/FilterBtn';

function SearchForm() {
    return (
        <section className="search-form-section">
            <form className="search-form">
                <input 
                    className="search-form__input"
                    placeholder="Фильм"
                    required
                />
                <button 
                    className="search-form__btn"
                    type="button"
                >
                    Найти
                </button>
            </form>
            <FilterBtn />
        </section>
    )
};

export default SearchForm;