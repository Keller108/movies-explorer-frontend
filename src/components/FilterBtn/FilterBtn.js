import React from 'react';
import './FilterBtn.css';
import Filter from '../Filter/Filter';

function FilterBtn({isFilteredCards, onFilterChange}) {

    function handleChangeFilter() {
        onFilterChange();
    };

    return (
        <div className="filter-container">
            <button 
                className="filter"
                onClick={handleChangeFilter}
            >
            <Filter 
                isFilteredCards={isFilteredCards}
            />
            </button> 
            <p className="filter__text">
                Короткометражки
            </p>
        </div>
    )
};

export default FilterBtn;