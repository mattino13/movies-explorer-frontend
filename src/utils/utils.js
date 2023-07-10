const URLPrefix = 'https://api.nomoreparties.co';
const emailPattern = '[a-z0-9]+@[a-z]+.[a-z]{2,5}';
const userNamePattern = '[a-z0-9а-я]{2,}';

function getFullImageURL(URLSuffix) {
  return `${URLPrefix}${URLSuffix}`;
}

function formatMovieDuration(duration) {
  return `${Math.trunc(duration/60)}ч ${Math.round(duration % 60)}м`
}

function delayedCall(func, delay) {
  let timer;
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null;
      func.apply(this, arguments);
    }, delay)
  };
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

export { 
  getFullImageURL, 
  formatMovieDuration, 
  delayedCall, 
  getRenderMoviesOptions, 
  movieFilterFunction,
  emailPattern,
  userNamePattern
};
