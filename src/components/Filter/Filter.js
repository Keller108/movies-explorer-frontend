import React from 'react';
import './Filter.css';

function Filter({isOff}) {
    return (
        <span 
            className={isOff ? `filter-btn filter-btn_hidden` : `filter-btn`}
        >
            <span 
                className={isOff ? 
                    `filter-btn__circle filter-btn__circle_hidden` 
                    : `filter-btn__circle`}
            />
        </span>
    )
};

export default Filter;