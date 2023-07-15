import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext.js';
import { isMovieSaved, getMovieMyId } from '../../utils/utils.js';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';

import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

import mainApi from '../../utils/MainApi.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [hasApiError, setHasApiError] = React.useState(false);
  const [isCallingApi, setIsCallingApi] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('hasToken');
    
    if (token) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([userResponse, moviesResponse]) => {
          // пользователь
          setCurrentUser(userResponse);
          setLoggedIn(true);

          // его сохраненные фильмы
          setSavedMovies(moviesResponse);
        }
      )
      .catch((err) => console.log(err)); 
    } 
  }, []); 

  function handleLogin({ email, password }) {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.signin(email, password)
      .then((result) => {
          setHasApiError(false);
          localStorage.setItem('hasToken', 'true');
          setLoggedIn(true);
          setCurrentUser(result);
          navigate("/movies");
        }
      )
      .catch((err) => {
          console.log(err);
          setHasApiError(true);
        }
      )
      .finally(() => setIsCallingApi(false));
  }

  function handleRegister({ name, email, password }) {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.signup(name, email, password)
      .then((result) => {
          setHasApiError(false);
          handleLogin({ email: result.email, password });
        }
      )
      .catch((err) => {
          console.log(err);
          setHasApiError(true);
        }
      )
      .finally(() => setIsCallingApi(false));
  }

  function handleLogout() {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.signout()
      .then(() => {
          setHasApiError(false);

          localStorage.removeItem('hasToken');
          localStorage.removeItem('MoviesSearchData');
          setLoggedIn(false);
          setCurrentUser({});
          navigate("/");
        }
      )
      .catch((err) => {
          console.log(err);
          setHasApiError(true);
        }
      )
      .finally(() => setIsCallingApi(false));
  }

  function handleEditProfile({ name, email }) {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.setUserInfo(name, email)
      .then(() => {
          setHasApiError(false);
          setCurrentUser({ ...currentUser, name: name, email: email});
        }
      )
      .catch((err) => {
          console.log(err);
          setHasApiError(true);
        }
      )
      .finally(() => setIsCallingApi(false));
  }

  function handleToggleSave(movieData) {
    if (!isMovieSaved(movieData, savedMovies)) {
      // сохраняем фильм
      const movieDataForApiCall = {
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: movieData.imageFull,
        trailerLink: movieData.trailerLink,
        thumbnail: movieData.thumbnailFull,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      };

      mainApi.save(movieDataForApiCall)
        .then((result) => setSavedMovies([result, ...savedMovies]))
        .catch((err) => console.log(err));
    } 
    
    else {
      const myId = getMovieMyId(movieData, savedMovies);
      // удаляем фильм
      mainApi.resetSave(myId)
        .then(() => setSavedMovies(savedMovies.filter((item) => {return item._id !== myId})))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <SavedMoviesContext.Provider value={{savedMovies: savedMovies, toggleSaveHandler: handleToggleSave}}>

          <Routes>
            {/* НЕзащищенные маршруты */}
            <Route path="/" element={<><Header loggedIn={loggedIn}/><Main/><Footer/></>} />

            <Route path="/sign-in" element={
              <Login onLogin={handleLogin} isCallingApi={isCallingApi} hasApiError={hasApiError}/>}/>

            <Route path="/sign-up" element={
              <Register onRegister={handleRegister} hasApiError={hasApiError} isCallingApi={isCallingApi}/>}
            />
            
            {/* защищенные маршруты */}
            <Route path="/movies" 
              element={
                <ProtectedRoute loggedIn={loggedIn}>

                  <>
                    <Header loggedIn={loggedIn}/>
                    <Movies/>
                    <Footer/>
                  </>

                </ProtectedRoute>
              }
            />

            <Route path="/saved-movies" 
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  
                  <>
                    <Header loggedIn={loggedIn}/>
                    <SavedMovies/>
                    <Footer/>
                  </>

                </ProtectedRoute>
              }
            />
            
            <Route path="/profile" 
              element={
                <ProtectedRoute 
                  loggedIn={loggedIn} onLogout={handleLogout} onEditProfile={handleEditProfile}
                  hasApiError={hasApiError} isCallingApi={isCallingApi}>
                  
                  <>
                    <Header loggedIn={loggedIn}/>
                    <Profile 
                      onLogout={handleLogout} onEditProfile={handleEditProfile}
                      hasApiError={hasApiError} isCallingApi={isCallingApi} />
                  </>
                      
                </ProtectedRoute>
              }
            /> 
            
            {/* маршрут на страницу 404 */}
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>

        </SavedMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
