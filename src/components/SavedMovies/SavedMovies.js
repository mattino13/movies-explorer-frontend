import React from 'react';

import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext.js';
import { movieFilterFunction } from '../../utils/utils.js';

function SavedMovies() {
  const { savedMovies } = React.useContext(SavedMoviesContext);
  const [ searchString, SetSearchString ] = React.useState('');
  const [ onlyShortMovies, SetOnlyShortMovies ] = React.useState(false);

  function moviesToRender() {
    const result = savedMovies.filter((item) => { return movieFilterFunction(item, searchString, onlyShortMovies) });
    result.forEach((item) => {
      // установка в новых свойствах карточки свойств для совместимости со свойствами фильмов из внешнего Api
      // (для дальнейшей записи в свое Api)
      item.imageFull = item.image;
      item.thumbnailFull = item.thumbnail;
      item.reactKey = item._id;
      item.id = item.movieId;
      } 
    );
    return result;
  }
  
  function handleSearch(searchString, onlyShortMovies) {
    SetSearchString(searchString);
    SetOnlyShortMovies(onlyShortMovies);
  }

  return (
    <section className="savedMovies">
      <SearchForm onSearch={handleSearch} viewMode="savedMovies"/>
      <MoviesCardList movies={moviesToRender()} viewMode="savedMovies"/>
    </section>
 )
}

export default SavedMovies;