import React from 'react';
import { useState } from 'react';
import './LikeBtn.css';

function LikeBtn ({isLike, handleLikeMovie, handleDeleteMovie}) {

    return (
        <button 
            onClick={isLike ? handleLikeMovie : handleDeleteMovie}
            className={isLike ? `movies-card-item__like-btn movies-card-item__like-btn_visible` : `movies-card-item__like-btn`}
            type="button"
            aria-label="Like"
        />
    )
};

export default LikeBtn;