import React from 'react';

import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import movies from '../../utils/movies.js';
import Preloader from '../Preloader/Preloader.js';

function Movies() {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearch() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch}/>
      {isLoading && <Preloader/>}
      {!isLoading && <MoviesCardList movies={movies.filter(item => (item.id <= 6))} viewMode="allMovies"/>}
      <button className="movies__button">Ещё</button>
    </section>
 )
}

export default Movies;
