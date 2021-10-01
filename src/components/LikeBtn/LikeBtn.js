import React from 'react';
import './LikeBtn.css';

function LikeBtn ({isLike, onMovieLike, isSaved}) {

    return (
        <>
            { isSaved ? (
                <button 
                    onClick={onMovieLike}
                    className="movies-card-item__like-btn_type_delete"
                    type="button"
                    aria-label="Remove Movie From Favourite"
                    /> 
                ) : 
                (
                    <button 
                    onClick={onMovieLike}
                    className={isLike ? `movies-card-item__like-btn movies-card-item__like-btn_visible` : `movies-card-item__like-btn`}
                    type="button"
                    aria-label="Like"
                />        
                )       
            }
    </>
    );
};

export default LikeBtn;