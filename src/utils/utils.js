const URLPrefix = 'https://api.nomoreparties.co';

function getFullImageURL(URLSuffix) {
  return `${URLPrefix}${URLSuffix}`;
}

function formatMovieDuration(duration) {
  return `${Math.trunc(duration/60)}ч ${Math.round(duration % 60)}м`
}

export { getFullImageURL, formatMovieDuration};
