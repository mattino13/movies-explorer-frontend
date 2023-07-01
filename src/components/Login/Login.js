import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css'
import SiteLogo from '../SiteLogo/SiteLogo.js';


function Login({ onLogin }) {

  function handleSubmit(e) {
    e.preventDefault();
  
    onLogin();
  }

  return (
    <div className="login">
      <SiteLogo className="login__logo"/>

      <h3 className="login__tittle">Рады видеть!</h3>

      <form onSubmit={handleSubmit}>

        <label htmlFor="email" className="login__text">E-mail</label>
        <input id="email" required type="email" 
          className="login__item login__item_color"/>

        <label htmlFor="password" className="login__text">Пароль</label>
        <input id="password" required type="password" className="login__item" placeholder="Пароль"/>

        <button type="submit" className="login__button-save">Войти</button>

      </form>

      <p className="login__subtitle">Ещё не зарегистрированы? 
        <Link to="/sign-up" className="login__subtitle form__subtitle_color"> Регистрация</Link>
      </p>
    </div>
  )

}

export default Login;