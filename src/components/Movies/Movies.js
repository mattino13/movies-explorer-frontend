import React from 'react';

import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import Preloader from '../Preloader/Preloader.js';
import { getRenderMoviesOptions, movieFilterFunction, getFullImageURL } from '../../utils/utils.js';

function Movies() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasApiError, setHasApiError] = React.useState(false);
  const [searchData, setSearchData] = React.useState({});
  const [maximunCardCount, setMaximunCardCount] = React.useState(getRenderMoviesOptions().initialCount);

  //const [width, setWidth] = React.useState(window.innerWidth);

  // загружаем ранее найденные фильмы
  React.useEffect(() => {
    const moviesSearchData = localStorage.getItem('MoviesSearchData');
    
    if (moviesSearchData) {
      setSearchData(JSON.parse(moviesSearchData));
    }
  }, []); 

  function moviesToRender() {
    const result = (searchData.searchResult ?? []).slice(0, maximunCardCount);
    result.forEach((item) => {
      // установка в новых свойствах карточки полных ссылок на изображения
      // (для дальнейшей записи в свое Api)
      item.imageFull = getFullImageURL(item.image.url);
      item.thumbnailFull = getFullImageURL(item.image.formats.thumbnail.url);  
      item.reactKey = item.id;
    } 
    );
    return result;
  }

  function actualizeMoviesSearchData(searchString, onlyShortMovies, allMovies) {
      const searchResult = allMovies.filter((item) => { return movieFilterFunction(item, searchString, onlyShortMovies) });
      return {searchString, onlyShortMovies, searchResult, apiResult: allMovies};
  }

  function handleSearch(searchString, onlyShortMovies) {
    setMaximunCardCount(getRenderMoviesOptions().initialCount);
    const moviesSearchData = JSON.parse(localStorage.getItem('MoviesSearchData'));
    
    if (moviesSearchData) {
      const newSearchData = actualizeMoviesSearchData(searchString, onlyShortMovies, moviesSearchData.apiResult);
      localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
      setSearchData(newSearchData);
    } else {

      setHasApiError(false);
      setIsLoading(true);
      moviesApi.getMovies()
        .then((result) => {
          const newSearchData = actualizeMoviesSearchData(searchString, onlyShortMovies, result);
          localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
          setSearchData(newSearchData);
        })
        .catch((err) => {
          console.log(err);
          setHasApiError(true);
        })
        .finally(() => setIsLoading(false));
      }
  }

  function handleShowMore() {
    setMaximunCardCount(maximunCardCount + getRenderMoviesOptions().extraCount);
  }

  return (
    <main className="movies">
      <SearchForm onSearch={handleSearch} searchString={searchData.searchString ?? ""} 
        onlyShortMovies={searchData.onlyShortMovies ?? ""} viewMode="allMovies"/>
        
      {isLoading && <Preloader/>}
      {moviesToRender().length === 0 && (!isLoading) && <p className="movies__text">Ничего не найдено</p>}

      { hasApiError && 
        <p className="movies__text">
          Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз
        </p>}

      {!isLoading && (moviesToRender().length > 0) && 
        <MoviesCardList movies={moviesToRender()} viewMode="allMovies"/>}

      {((searchData.searchResult ?? []).length > maximunCardCount) && (!isLoading) && 
        <button className="movies__button" onClick={handleShowMore}>Ещё</button>
      }
    </main>
 )
}

export default Movies;
