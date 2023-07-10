import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
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
  
  const navigate = useNavigate();

  function handleLogin({ email, password }) {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.signin(email, password)
      .then((result) => {
          setHasApiError(false);

          console.log(result);
          localStorage.setItem('hasToken', 'true');
          setLoggedIn(true);
          setCurrentUser(result);
        }
      )
      .catch((err) => {
          console.log(err);
          setHasApiError(true);
        }
      )
      .finally(() => setIsCallingApi(false));

    setLoggedIn(true);
    navigate("/movies");
  }

  function handleLogout() {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.signout()
      .then(() => {
          setHasApiError(false);

          localStorage.removeItem('hasToken');
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

  function handleRegister({ name, email, password }) {
    setHasApiError(false);
    setIsCallingApi(true);

    mainApi.signup(name, email, password)
      .then(() => setHasApiError(false))
      .catch((err) => {
          console.log(err);
          setHasApiError(true);
        }
      )
      .finally(() => setIsCallingApi(false));
  }

  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Routes>
          <Route path="/" element={<><Header loggedIn={loggedIn}/><Main/><Footer/></>} />

          

          <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} hasApiError={hasApiError} isCallingApi={isCallingApi}/>}/>
          <Route path="/movies" element={<><Header loggedIn={loggedIn}/><Movies/><Footer/></>}/>
          <Route path="/saved-movies" element={<><Header loggedIn={loggedIn}/><SavedMovies/><Footer/></>}/>
          
          <Route path="/profile" element={
            <>
              <Header loggedIn={loggedIn}/>
              <Profile 
                onLogout={handleLogout} onEditProfile={handleEditProfile}
                hasApiError={hasApiError} isCallingApi={isCallingApi} />
            </>}
          />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
