import React from 'react';
import './MoviesCard.css'

import { getFullImageURL, formatMovieDuration } from '../../utils/utils.js';

function MoviesCard({ movieData, isSaved, viewMode }) {
  function getMoviesCardIconClass() {
    if (isSaved && viewMode === "allMovies") {
      return "moviesCard__icon_savedFlag"
    } 
    
    if (isSaved && viewMode === "savedMovies") {
      return "moviesCard__icon_savedCross"
    }

    return "";
  }

  return (
    <div className="moviesCard">
      <div className="moviesCard__info">
        <h2 className="moviesCard__title">{movieData.nameRU}</h2>
        <p className="moviesCard__time">{formatMovieDuration(movieData.duration)}</p>
      </div>
      <button className={`moviesCard__icon ${getMoviesCardIconClass()}`}></button>
      <img className="moviesCard__photo" src={getFullImageURL(movieData.imageURL)} alt="фото из фильма"/>
    </div>
 )
}

export default MoviesCard;