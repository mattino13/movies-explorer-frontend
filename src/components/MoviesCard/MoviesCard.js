import React from 'react';
import './MoviesCard.css'

import { formatMovieDuration, isMovieSaved } from '../../utils/utils.js';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext.js';

function MoviesCard({ movieData, viewMode, onToggleSave }) {
  const { savedMovies, toggleSaveHandler } = React.useContext(SavedMoviesContext);

  function getMoviesCardIconClass() {
    
    if (viewMode === "allMovies" && isMovieSaved(movieData, savedMovies)) {
      return "moviesCard__icon_savedFlag";
    } 
    
    // на вкладке "сохраненные фильмы" все фильмы в избранном :)
    if (viewMode === "savedMovies") {
      return "moviesCard__icon_savedCross";
    }

    return "";
  }

  function handleMovieSave() {
    toggleSaveHandler(movieData);
  }

  return (
    <div className="moviesCard">
      <div className="moviesCard__info">
        <h2 className="moviesCard__title">{movieData.nameRU}</h2>
        <p className="moviesCard__time">{formatMovieDuration(movieData.duration)}</p>
      </div>
      <button className={`moviesCard__icon ${getMoviesCardIconClass()}`} onClick={handleMovieSave}></button>
      <a href={movieData.trailerLink} target="_blank" rel='noreferrer'>
        <img className="moviesCard__photo" src={movieData.imageFull} alt="фото из фильма"/>
      </a>
    </div>
 )
}

export default MoviesCard;