import React from 'react';

import './Profile.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../utils/UseForm.js';
import { emailPattern, userNamePattern } from '../../utils/utils.js';

function Profile({ onLogout, onEditProfile, hasApiError, isCallingApi }) {
  const [isSaved, SetIsSaved] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } = 
    useFormWithValidation({ name: currentUser.name, email:currentUser.email });

  function isProfileChanged() {
    return (values.name !== currentUser.name || values.email !== currentUser.email);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onEditProfile(values);
    SetIsSaved(true);
  }

  return (
    <div className="profile">
      <h3 className="profile__tittle">Привет, {currentUser.name}!</h3>

      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__container">
          <label htmlFor="userName" className="profile__text">Имя</label>
          <input id="userName" name="name" value={values.name} 
            minLength={2} maxLength={30} required pattern={userNamePattern}
            className="profile__item" onChange={handleChange}/>
          <span className="profile__text profile__text_error">{errors.name || ''}</span>
        </div>
        
        <div className="profile__container profile__container_none">
          <label htmlFor="email" className="profile__text">E-mail</label>
          <input id="email" name="email" value={values.email} required pattern={emailPattern} type="email"
            className="profile__item" onChange={handleChange}/>
          <span className="profile__text profile__text_error">{errors.email || ''}</span>
        </div>

        {hasApiError && <span className="profile__text profile__text_error">Что-то пошло не так...</span>}
        {!hasApiError && !isCallingApi && isSaved && <span className="profile__text">Профиль обновлен</span>}

        <button 
          type="submit" 
          className={`profile__subtitle ${ (!isValid || isCallingApi || !isProfileChanged()) ? "profile__subtitle_disabled" : ""}`}
          disabled={!isValid || isCallingApi || !isProfileChanged()} >
            Редактировать
        </button>
      </form>

      <p className="profile__subtitle profile__subtitle_color" onClick={onLogout}>Выйти из аккаунта</p>   
      
    </div>
  )

}

export default Profile;