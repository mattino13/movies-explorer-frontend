class MoviesApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка. HTTP статус: ${response.status}`);
    } 
  }

  _request(url, options) {
    return fetch(url, options).then(res => this._checkResponse(res));
  }

  getMovies() {
    return this._request(this._buildUrl('/beatfilm-movies'), this._options);
  }

  _buildUrl(suffix) {
    return `${this._options.baseUrl}${suffix}`;
  }
}

const moviesApi = new MoviesApi({
  baseUrl: ' https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;