import React from 'react';
import './Filter.css';

function Filter({isOff}) {
    return (
        <span 
            className={isOff ? `filter-btn` : `filter-btn filter-btn_hidden`}
        >
            <span 
                className={isOff ? 
                    `filter-btn__circle` 
                    : `filter-btn__circle filter-btn__circle_hidden`}
            />
        </span>
    )
};

export default Filter;