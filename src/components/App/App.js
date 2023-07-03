import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';

import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
    navigate("/movies");
  }

  function handleLogout() {
    setLoggedIn(false);
    navigate("/");
  }

  function handleEditProfile() {
    navigate("/movies");
  }

  function handleRegister() {
    navigate("/sign-in");
  }

  return (
    <div className="page">
      
      <Routes>
        <Route path="/" element={<><Header loggedIn={loggedIn}/><Main/><Footer/></>} />
        <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
        <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
        <Route path="/movies" element={<><Header loggedIn={loggedIn}/><Movies/><Footer/></>}/>
        <Route path="/saved-movies" element={<><Header loggedIn={loggedIn}/><SavedMovies/><Footer/></>}/>
        <Route path="/profile" element={
          <>
            <Header loggedIn={loggedIn}/>
            <Profile onLogout={handleLogout} onEditProfile={handleEditProfile}/>
          </>}
        />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>

      
      
    </div>
  );
}

export default App;
