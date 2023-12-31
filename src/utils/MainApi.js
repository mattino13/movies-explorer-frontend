class MainApi {
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

  _buildUrl(suffix) {
    return `${this._options.baseUrl}${suffix}`;
  }

  // регистрация
  signup(name, email, password) {
    const options = {
      ...this._options,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        password: password,
        email: email })};

    return this._request(this._buildUrl('/signup'), options);
  }

  // авторизация
  signin(email, password) {
    const options = {
      ...this._options,
      method: 'POST',
      body: JSON.stringify({
        password: password,
        email: email })};

    return this._request(this._buildUrl('/signin'), options);
  }

  // редактирование профиля
  setUserInfo(name, email) {
    const options = {
      ...this._options,
      method: 'PATCH', 
      body: JSON.stringify({name, email})};
    
    return this._request(this._buildUrl('/users/me'), options);
  }

  // получение данных текущего пользователя по токену
  getUserInfo() {
    return this._request(this._buildUrl('/users/me'), this._options);
  }
 
  // выход из профиля (только очистка cookie)
  signout() {
    const options = {
      ...this._options,
      method: 'POST'};

    return this._request(this._buildUrl('/signout'), options);
  }

  // поставить лайк фильму
  save(movieData) {
    const options = {
      ...this._options,
      method: 'POST',
      body: JSON.stringify(movieData)};
    
    return this._request(this._buildUrl('/movies'), options);
  }

  // снять лайк фильму
  resetSave(cardId) {
    const options = {
      ...this._options,
      method: 'DELETE'}; 

    return this._request(this._buildUrl(`/movies/${cardId}`), options);
  }

   // получение сохраненных текущим пользователем фильмов
   getSavedMovies() {
    return this._request(this._buildUrl('/movies'), this._options);
  }
}

const mainApi = new MainApi({
  //baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.mattino13-movies-explorer.nomoredomains.rocks',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;