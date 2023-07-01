import React from 'react';

import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import movies from '../../utils/movies.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies() {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearch() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <section className="savedMovies">
      <SearchForm onSearch={handleSearch}/>
      {isLoading && <Preloader/>}
      {!isLoading && <MoviesCardList movies={movies.filter(item => (item.id <= 3))} viewMode="savedMovies"/>}
      
    </section>
 )
}

export default SavedMovies;