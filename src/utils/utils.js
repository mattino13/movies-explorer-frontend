const URLPrefix = 'https://api.nomoreparties.co';
const emailPattern = '[a-z0-9]+@[a-z]+.[a-z]{2,5}';
const userNamePattern = '[ёЁA-Za-zа-яА-Я0-9 -\u2010]{2,}';

function getFullImageURL(URLSuffix) {
  return `${URLPrefix}${URLSuffix}`;
}

function formatMovieDuration(duration) {
  return `${Math.trunc(duration/60)}ч ${Math.round(duration % 60)}м`
}

function getRenderMoviesOptions() {
  const width = window.innerWidth
  let initialCount;
  let extraCount;

  if (width > 1200) {
    initialCount = 12;
    extraCount = 3;
  } else {
    if (width > 736 && width <= 1200) {
      initialCount = 8;
      extraCount = 2;
    } else { // <= 736
      initialCount = 5;
      extraCount = 2;
    }
  }

  return {initialCount, extraCount};
}

function movieFilterFunction(item, searchString, onlyShortMovies) {
  return (
    (
      item.nameRU.toLowerCase().includes(searchString.toLowerCase()) || 
      item.nameEN.toLowerCase().includes(searchString.toLowerCase())
    ) &&
    (
      onlyShortMovies === false || item.duration <= 40
    )
  );
}

// ф-ция определяет, сохранен ли фильм movieToTest в избранном (savedMovies)
function isMovieSaved(movieToTest, savedMovies) {
  return savedMovies.some((item) => { return item.movieId === movieToTest.id});
}

// ф-ция возвращает _id (в нашем Api) для фильма по переданному id внешнего Api
function getMovieMyId(movieToTest, savedMovies) {
  let result;
  savedMovies.forEach((item) => { if (item.movieId === movieToTest.id) { result = item._id }});
  return result;
}

export { 
  getFullImageURL, 
  formatMovieDuration, 
  getRenderMoviesOptions, 
  movieFilterFunction,
  isMovieSaved,
  getMovieMyId,
  emailPattern,
  userNamePattern
};
