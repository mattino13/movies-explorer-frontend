import React from 'react';

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ movies, viewMode }) {

  return (
    <section className="moviesCardList">
      {movies.map((item) => (
        <MoviesCard 
          key={item.reactKey}
          movieData={item}
          viewMode={viewMode}
        />
      ))}
    </section>
 )
}

export default MoviesCardList;