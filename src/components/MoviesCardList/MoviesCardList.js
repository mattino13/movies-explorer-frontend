import React from 'react';

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.js';
//import movies from '../../utils/movies.js'

function MoviesCardList({ movies, viewMode }) {

  return (
    <section className="moviesCardList">
      {movies.map((item) => (
        <MoviesCard 
          key={item.id}
          movieData={{ nameRU: item.nameRU, duration: item.duration, imageURL: item.image.url }}
          isSaved={item.id <=3 }
          viewMode={viewMode}
        />
      ))}
    </section>
 )
}

export default MoviesCardList;