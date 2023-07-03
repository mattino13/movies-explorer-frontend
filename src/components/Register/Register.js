import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css'
import SiteLogo from '../SiteLogo/SiteLogo.js';

function Register({ onRegister }) {
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onRegister();
  }

  return (
    <div className="register">
      <SiteLogo className="register__logo"/>
      <h3 className="register__tittle">Добро пожаловать!</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userName" className="register__text">Имя</label>
        <input id="userName" minLength={2} maxLength={30} required
              className="register__item" />

        <label htmlFor="email" className="register__text">E-mail</label>
        <input id="email" required type="email"
              className="register__item register__item_color" />

        <label htmlFor="password" className="register__text">Пароль</label>
        <input id="password" type="password" required
              className="register__item register__item_none" />
        <span className="register__text register__text_error">Что-то пошло не так...</span>

        <button type="submit" className="register__button-save">Зарегистрироваться</button>
      </form>

      <p className="register__subtitle">Уже зарегистрированы? 
          <Link to="/sign-in" className="register__subtitle register__subtitle_color"> Войти</Link>
      </p>  
    </div>
  )
}

export default Register;