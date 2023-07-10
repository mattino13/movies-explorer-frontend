import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css'
import SiteLogo from '../SiteLogo/SiteLogo.js';
import { useFormWithValidation } from '../../utils/UseForm.js';
import { emailPattern, userNamePattern } from '../../utils/utils.js';

function Register({ onRegister, hasApiError, isCallingApi }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
  
    onRegister(values);
  }

  return (
    <div className="register">
      <SiteLogo className="register__logo"/>
      <h3 className="register__tittle">Добро пожаловать!</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userName" className="register__text">Имя</label>
        <input id="userName" name="name" value={values.name || ''} 
          minLength={2} maxLength={30} required pattern={userNamePattern}
          className="register__item" onChange={handleChange}/>
        <span className="register__text register__text_error">{errors.name || ''}</span>

        <label htmlFor="email" className="register__text">E-mail</label>
        <input id="email" name="email" value={values.email || ''} required pattern={emailPattern} type="email"
          className="register__item register__item_color" onChange={handleChange}/>
        <span className="register__text register__text_error">{errors.email || ''}</span>

        <label htmlFor="password" className="register__text">Пароль</label>
        <input id="password" name="password" value={values.password || ''} type="password" required
          className="register__item register__item_none" onChange={handleChange}/>
        <span className="register__text register__text_error">{errors.password || ''}</span>

        {hasApiError && <span className="register__text register__text_error">Что-то пошло не так...</span>}

        <button 
          type="submit" 
          className={`register__button-save ${ (!isValid || isCallingApi) ? "register__button-save_disabled" : ""}`}
          disabled={!isValid || isCallingApi} >
            Зарегистрироваться
        </button>
      </form>
      
      <p className="register__subtitle">Уже зарегистрированы? 
          <Link to="/sign-in" className="register__subtitle-color"> Войти</Link>
      </p>  
    </div>
  )
}

export default Register;