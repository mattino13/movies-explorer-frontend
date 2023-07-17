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
          <input id="userName" name="name" value={values.name || ''} 
            required pattern={userNamePattern}
            className="profile__item" onChange={handleChange}/>
        </div>
        <span className="profile__text profile__text_error">{errors.name || ''}</span>

        <div className="profile__container profile__container_none">
          <label htmlFor="userEmail" className="profile__text">E-mail</label>
          <input id="userEmail" name="email" value={values.email || ''} 
            required pattern={emailPattern} 
            className="profile__item" onChange={handleChange}/>
        </div>
        <span className="profile__text profile__text_error">{errors.email || ''}</span>

        <span className="profile__text profile__text_api-error">{hasApiError && 'Что-то пошло не так...'}</span>
        <span className="profile__text profile__info">{!hasApiError && !isCallingApi && isSaved && 'Профиль обновлен'}</span>

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