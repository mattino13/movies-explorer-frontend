import React from 'react';

import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import Preloader from '../Preloader/Preloader.js';
import { delayedCall, getRenderMoviesOptions, movieFilterFunction } from '../../utils/utils.js';

function Movies() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasApiError, setHasApiError] = React.useState(false);
  const [searchData, setSearchData] = React.useState({});
  const [width, setWidth] = React.useState(window.innerWidth);

  const [maximunCardCount, setMaximunCardCount] = React.useState(getRenderMoviesOptions().initialCount);

  // действия при монтировании компонента
  React.useEffect(() => {
    const moviesSearchData = localStorage.getItem('MoviesSearchData');
    
    if (moviesSearchData) {
      setSearchData(JSON.parse(moviesSearchData));
    }
  },
  []
  ); 

  // подключаем отслеживание resize окна
  React.useEffect(() => {
    const delayedResize = delayedCall(() => setWidth(window.innerWidth), 200);
    
    window.addEventListener('resize', delayedResize);
    return () => {
      window.removeEventListener('resize', delayedResize);
    };
  }, []);

  function moviesToRender() {
    return (searchData.searchResult ?? []).slice(0, maximunCardCount);
  }
  
  function checkToken() {
    /*const token = localStorage.getItem('hasToken');
    
    if (token) {
      auth.checkToken()
        .then((result) => {
          setEmail(result.email);
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      )
      .catch((err) => console.log(err));
    }*/
  }

  React.useEffect(() => {
    //checkToken();
  }, []); 

  function handleSearch(searchString, onlyShortMovies) {
    setHasApiError(false);
    setIsLoading(true);
    setMaximunCardCount(getRenderMoviesOptions().initialCount);
    moviesApi.getMovies()
      .then((result) => {
        const searchResult = result.filter((item) => { return movieFilterFunction(item, searchString, onlyShortMovies) });
        const newSearchData = {searchString, onlyShortMovies, searchResult, apiResult: result};

        localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
        setSearchData(newSearchData);
      })
      .catch((err) => {
        console.log(err);
        setHasApiError(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleShowMore() {
    setMaximunCardCount(maximunCardCount + getRenderMoviesOptions().extraCount);
  }

  return (
    <main className="movies">
      <SearchForm onSearch={handleSearch} searchString={searchData.searchString ?? ""} onlyShortMovies={searchData.onlyShortMovies ?? ""}/>
      {isLoading && <Preloader/>}
      {moviesToRender().length === 0 && (!isLoading) && <p className="movies__text">Ничего не найдено</p>}

      { hasApiError && 
        <p className="movies__text">
          Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз
        </p>}

      {!isLoading && (moviesToRender().length > 0) && <MoviesCardList movies={moviesToRender()} viewMode="allMovies"/>}

      {((searchData.searchResult ?? []).length > maximunCardCount) && (!isLoading) && 
        <button className="movies__button" onClick={handleShowMore}>Ещё</button>
      }
    </main>
 )
}

export default Movies;
