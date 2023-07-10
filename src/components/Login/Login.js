import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css'
import SiteLogo from '../SiteLogo/SiteLogo.js';
import { useFormWithValidation } from '../../utils/UseForm.js';
import { emailPattern } from '../../utils/utils.js';


function Login({ onLogin, hasApiError, isCallingApi }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
  
    onLogin(values);
  }

  return (
    <div className="login">
      <SiteLogo className="login__logo"/>

      <h3 className="login__tittle">Рады видеть!</h3>

      <form onSubmit={handleSubmit}>

        <label htmlFor="email" className="login__text">E-mail</label>
        <input id="email" name="email" value={values.email || ''} type="email" required pattern={emailPattern}
          className="login__item login__item_color" onChange={handleChange}/>
        <span className="login__text login__text_error">{errors.email || ''}</span>

        <label htmlFor="password" className="login__text">Пароль</label>
        <input id="password" name="password" value={values.password || ''} type="password" required
          className="login__item login__item_none" onChange={handleChange}/>
        <span className="login__text login__text_error">{errors.password || ''}</span>

        {hasApiError && <span className="login__text login__text_error">Что-то пошло не так...</span>}

        <button type="submit" 
          className={`login__button-save ${ (!isValid || isCallingApi) ? "login__button-save_disabled" : ""}`}
          disabled={!isValid || isCallingApi}>
            Войти
        </button>

      </form>

      <p className="login__subtitle">Ещё не зарегистрированы? 
        <Link to="/sign-up" className="login__subtitle-color"> Регистрация</Link>
      </p>
    </div>
  )

}

export default Login;